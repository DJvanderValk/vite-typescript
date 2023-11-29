import React, { useEffect } from 'react';

import { Block as BlockIcon } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { urlPrefixes } from '~constants';
import { PageProps } from '~pages/types';

const NotAuthorizedPage = (props: PageProps) => {
	const { t } = useTranslation('general');

	const location = useLocation();
	const navigate = useNavigate();
	
	useEffect(() => {
		document.title = props.title;
	}, []);

	const reLogin = () => {
		navigate(urlPrefixes.LOGOUT, { state: { from: location } });
	};

	return (
		<Box
			width='100%'
			height='100%'
			justifyContent='center'
			p='30px'
			boxSizing='border-box'
		>
			<Stack direction='row' alignItems='center' spacing={3}>
				<BlockIcon fontSize='large' />
				<Box>
					<Typography variant='h2'>401</Typography>
					<Typography variant='body1'>{t('notAuthorized')}</Typography>
				</Box>
			</Stack>
			<Button onClick={reLogin}>Login as somebody else</Button>
		</Box>
	);
};

export default NotAuthorizedPage;
