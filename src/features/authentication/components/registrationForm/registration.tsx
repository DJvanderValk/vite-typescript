import React, { useRef, useState } from 'react';

import { Send as SendIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	Stack,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { regexes, urlPrefixes } from '~constants';

import UserService from '../../services/userService';

const Register = () => {
	const { t } = useTranslation('authentication');

	const userService = new UserService();

	// Get the navigation variables
	const navigate = useNavigate();
	const state = useLocation().state;

	const firstNameRef = useRef<HTMLInputElement>(null);
	const [firstName, setFirstName] = useState('');
	const [firstNameErrorMessage, setFirstNameErrorMessage] = useState('');

	const lastNameRef = useRef<HTMLInputElement>(null);
	const [lastName, setLastName] = useState('');
	const [lastNameErrorMessage, setLastNameErrorMessage] = useState('');

	const emailAddressRef = useRef<HTMLInputElement>(null);
	const [emailAddress, setEmailAddress] = useState('');
	const [emailAddressErrorMessage, setEmailAddressErrorMessage] = useState('');

	const passwordRef = useRef<HTMLInputElement>(null);
	const [password, setPassword] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

	const passwordConfirmationRef = useRef<HTMLInputElement>(null);
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const [loading, setLoading] = useState(false);

	/**
	 * Validate the username for validity
	 * @returns True if username is valid
	 */
	const validateName = (name: string): boolean => {
		if (name === '' || name.indexOf(' ') >= 0) {
			return false;
		}

		return true;
	};

	/**
	 * Validate the email address
	 * @returns True if username is valid
	 */
	const validateEmailAddress = (email: string): boolean => {
		return regexes.EMAIL.test(email);
	};

	/**
	 * Validate the password
	 * @returns True if it is a valid password
	 */
	const validatePassword = (): boolean => {
		const minimumPasswordLength = 8;
		if (password === '' || password.length < minimumPasswordLength) {
			return false;
		}

		return true;
	};

	/**
	 * Check if the password is the same as the validation
	 * password
	 * @returns True if the passwords are the same
	 */
	const confirmPassword = (): boolean => {
		return password === passwordConfirmation;
	};

	/**
	 * Handle a press from the keyboard
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Enter') {
			handleRegisterClick();
		}
	};

	/**
	 * Handle the click on the login button
	 */
	const handleRegisterClick = () => {
		const firstNameValid = validateName(firstName);
		const lastNameValid = validateName(lastName);
		const emailAddressValid = validateEmailAddress(emailAddress);
		const passwordValid = validatePassword();
		const passwordConfirmed = confirmPassword();

		if (!firstNameValid) {
			setFirstNameErrorMessage('enterValidName');
			if (document.activeElement !== firstNameRef.current) {
				firstNameRef.current?.focus();
			}
		} else if (!lastNameValid) {
			setFirstNameErrorMessage('enterValidName');
			if (document.activeElement !== lastNameRef.current) {
				lastNameRef.current?.focus();
			}
		} else if (!emailAddressValid) {
			setEmailAddressErrorMessage('enterValidEmail');
			if (document.activeElement !== emailAddressRef.current) {
				emailAddressRef.current?.focus();
			}
		} else if (!passwordValid) {
			setPasswordErrorMessage('enterValidPassword');
			if (document.activeElement !== passwordRef.current) {
				passwordRef.current?.focus();
			}
		} else if (!passwordConfirmed) {
			setPasswordConfirmation('');
			setPasswordErrorMessage('differentPasswords');
			if (document.activeElement !== passwordConfirmationRef.current) {
				passwordConfirmationRef.current?.focus();
			}
		} else {
			register();
		}

		if (firstNameValid) {
			setFirstNameErrorMessage('');
		}
		if (lastNameValid) {
			setLastNameErrorMessage('');
		}
		if (emailAddressValid) {
			setEmailAddressErrorMessage('');
		}
		if (passwordValid && passwordConfirmed) {
			setPasswordErrorMessage('');
		}
	};

	/**
	 * WIP
	 */
	const register = async () => {
		setLoading(true);

		let isRegistered;
		try {
			isRegistered = await userService.register(
				emailAddress,
				password,
				firstName,
				lastName,
			);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}

		if (isRegistered) {
			setEmailAddress('');
			setPassword('');
			setFirstName('');
			setLastName('');
			redirect();
		}
	};

	/**
	 * Redirect after succesful login
	 */
	const redirect = () => {
		if (state && !state.from.pathname.includes(urlPrefixes.LOGOUT)) {
			navigate(
				{
					pathname: state.from.pathname,
					search: state.from.search,
				},
				{ replace: true },
			);
		} else {
			navigate(urlPrefixes.HOME);
		}
	};

	return (
		<Stack spacing='12px'>
			<Stack direction='row' spacing='8px'>
				<FormControl
					error={firstNameErrorMessage !== ''}
					sx={{ width: '100%' }}
				>
					<InputLabel>{t('firstName')}</InputLabel>
					<Input
						type='text'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						onKeyDown={handleKeyDown}
						inputRef={firstNameRef}
						autoFocus
						inputProps={{ maxLength: 40 }}
					/>
					<FormHelperText>{firstNameErrorMessage}</FormHelperText>
				</FormControl>

				<FormControl error={lastNameErrorMessage !== ''} sx={{ width: '100%' }}>
					<InputLabel>{t('lastName')}</InputLabel>
					<Input
						type='text'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						onKeyDown={handleKeyDown}
						inputRef={lastNameRef}
						inputProps={{ maxLength: 40 }}
					/>
					<FormHelperText>{lastNameErrorMessage}</FormHelperText>
				</FormControl>
			</Stack>

			<FormControl
				error={emailAddressErrorMessage !== ''}
				sx={{ width: '100%' }}
			>
				<InputLabel>{t('emailAddress')}</InputLabel>
				<Input
					type='email'
					placeholder='my.address@email.com'
					value={emailAddress}
					onChange={(e) => setEmailAddress(e.target.value)}
					onKeyDown={handleKeyDown}
					inputRef={emailAddressRef}
					inputProps={{ maxLength: 40 }}
				/>
				<FormHelperText>{emailAddressErrorMessage}</FormHelperText>
			</FormControl>

			<Stack direction='row' spacing='8px'>
				<FormControl error={passwordErrorMessage !== ''} sx={{ width: '100%' }}>
					<InputLabel>{t('password')}</InputLabel>
					<Input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onKeyDown={handleKeyDown}
						inputRef={passwordRef}
						inputProps={{ maxLength: 40 }}
					/>
					<FormHelperText>{passwordErrorMessage}</FormHelperText>
				</FormControl>

				<FormControl error={passwordErrorMessage !== ''} sx={{ width: '100%' }}>
					<InputLabel>{t('confirmPassword')}</InputLabel>
					<Input
						type='password'
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						onKeyDown={handleKeyDown}
						inputRef={passwordConfirmationRef}
						inputProps={{ maxLength: 40 }}
					/>
				</FormControl>
			</Stack>

			<Box width='100%' display='flex' justifyContent='flex-end'>
				<LoadingButton
					endIcon={<SendIcon />}
					onClick={handleRegisterClick}
					loading={loading}
					loadingPosition='end'
					variant='contained'
					sx={{ my: '10px', width: 'fit-content' }}
				>
					{t('register')}
				</LoadingButton>
			</Box>
		</Stack>
	);
};

export default Register;
