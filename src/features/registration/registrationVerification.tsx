import React, { useState } from 'react';

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
import { UserService } from '~services';

const RegistrationVerification = () => {
	const { t } = useTranslation('authentication');

	const userService = new UserService();

	// Get the navigation variables
	const navigate = useNavigate();
	const state = useLocation().state;

	const [verificationCode, setVerificationCode] = useState('');
	const [verificationCodeErrorMessage, setVerificationCodeErrorMessage] =
		useState('');

	const [loading, setLoading] = useState(false);

	/**
	 *
	 * @param e
	 */
	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
		if (e.key === 'Enter') {
			handleVerifyClick();
		}
	};

	/**
	 * Handle the click on the login button
	 */
	const handleVerifyClick = () => {};

	/**
	 * WIP
	 */
	const verify = async () => {
		setLoading(true);

		let isVerified;
		try {
			isVerified = await userService.verifyRegistration(verificationCode);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}

		if (isVerified) {
			setVerificationCode('');
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

	return <Box></Box>;
};

export default RegistrationVerification;
