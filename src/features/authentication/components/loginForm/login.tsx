import React, { useRef, useState } from 'react';

import {
	Send as SendIcon,
	Visibility as VisibilityIcon,
	VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	FormControl,
	FormHelperText,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	Stack,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { urlPrefixes } from '~constants';

import UserService from '../../services/userService';

interface LoginProps {
	user?: string;
}

const Login = (props: LoginProps) => {
	const { t } = useTranslation('authentication');

	const userService = new UserService();

	// Get the navigation variables
	const navigate = useNavigate();
	const location = useLocation();

	const usernameRef = useRef<HTMLInputElement>(null);
	const [username, setUsername] = useState(props.user);
	const [usernameErrorMessage, setUsernameErrorMessage] = useState('');

	const passwordRef = useRef<HTMLInputElement>(null);
	const [passwordVisibility, setPasswordVisibility] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

	const [loading, setLoading] = useState(false);

	/**
	 * Validate the username for validity
	 * @returns True if username is valid
	 */
	const validateUsername = (): boolean => {
		if (username === '') {
			setUsernameErrorMessage(t('enterUsername'));
			return false;
		} else if (username && username.indexOf(' ') >= 0) {
			setUsernameErrorMessage(t('enterValidUsername'));
			return false;
		}

		setUsernameErrorMessage('');
		return true;
	};

	/**
	 * Validate the password
	 * @returns True if it is a valid password
	 */
	const validatePassword = (): boolean => {
		if (password === '') {
			setPasswordErrorMessage(t('enterPassword'));
			return false;
		}

		setPasswordErrorMessage('');
		return true;
	};

	/**
	 * Handle a press from the keyboard
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Enter') {
			const usernameValid = validateUsername();
			const passwordValid = validatePassword();

			if (usernameValid && passwordValid) {
				authenticate();
			} else if (!usernameValid) {
				if (document.activeElement !== usernameRef.current) {
					usernameRef.current?.focus();
				}
			} else {
				if (document.activeElement !== passwordRef.current) {
					passwordRef.current?.focus();
				}
			}
		}
	};

	/**
	 * Handle the click on the login button
	 */
	const handleLoginClick = () => {
		const usernameValid = validateUsername();
		const passwordValid = validatePassword();

		if (!usernameValid) {
			usernameRef.current?.focus();
		} else if (!passwordValid) {
			passwordRef.current?.focus();
		} else {
			authenticate();
		}
	};

	/**
	 * Authenticate with the username and password
	 */
	const authenticate = async () => {
		setLoading(true);

		if (!username) {
			setUsernameErrorMessage(t('enterUsername'));
			return;
		}

		let isAuthenticated;
		try {
			isAuthenticated = await userService.authenticate(username, password);
		} catch (error) {
			setPasswordErrorMessage(t('loginFailed'));
		} finally {
			setLoading(false);
		}

		if (isAuthenticated) {
			// Just make sure we remove the password, shouldn't be
			// necessary right?
			setPassword('');
			redirect();
		} else {
			setPasswordErrorMessage(t('wrongUsernameOrPassword'));
		}
	};

	/**
	 * Redirect after succesful login
	 */
	const redirect = () => {
		const stateFrom = location.state?.from;
		console.log(stateFrom);
		if (stateFrom && !stateFrom.pathname.includes(urlPrefixes.LOGOUT)) {
			navigate(
				{
					pathname: stateFrom.pathname,
					search: stateFrom.search,
				},
				{ replace: true },
			);
		} else if (
			stateFrom?.state &&
			stateFrom.pathname.includes(urlPrefixes.LOGOUT)
		) {
			// We tried relogging in. Maybe because to log in as admin, because we
			// we're unauthorized
			const subStateFrom = stateFrom.state.from;
			navigate(
				{
					pathname: subStateFrom.pathname,
					search: subStateFrom.search,
				},
				{ replace: true },
			);
		} else {
			navigate({
				pathname: urlPrefixes.HOME,
				search: window.location.search,
			});
		}
	};

	return (
		<Stack spacing='16px'>
			<FormControl error={usernameErrorMessage !== ''} sx={{ width: '100%' }}>
				<InputLabel>{t('username')}</InputLabel>
				<Input
					type='email'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					onKeyDown={handleKeyDown}
					inputRef={usernameRef}
					autoFocus
					inputProps={{ maxLength: 40 }}
				/>
				<FormHelperText>{usernameErrorMessage}</FormHelperText>
			</FormControl>

			<FormControl error={passwordErrorMessage !== ''} sx={{ width: '100%' }}>
				<InputLabel>{t('password')}</InputLabel>
				<Input
					type={passwordVisibility ? 'text' : 'password'}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyDown={handleKeyDown}
					inputRef={passwordRef}
					inputProps={{ maxLength: 40 }}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onMouseDown={() =>
									setPasswordVisibility((visibility) => !visibility)
								}
							>
								{passwordVisibility ? (
									<VisibilityIcon />
								) : (
									<VisibilityOffIcon />
								)}
							</IconButton>
						</InputAdornment>
					}
				/>
				<FormHelperText>{passwordErrorMessage}</FormHelperText>
			</FormControl>

			<Box width='100%' display='flex' justifyContent='flex-end'>
				<LoadingButton
					endIcon={<SendIcon />}
					onClick={handleLoginClick}
					loading={loading}
					loadingPosition='end'
					variant='contained'
					sx={{ my: '10px', width: 'fit-content' }}
				>
					{t('login')}
				</LoadingButton>
			</Box>
		</Stack>
	);
};

Login.defaultProps = {
	user: '',
};

export default Login;
