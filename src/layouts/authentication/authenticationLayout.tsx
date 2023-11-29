import React from 'react';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';

import background from '~assets/2433075.jpg';
import { LanguageSelect } from '~components';
import { urlPrefixes } from '~constants';

import './authenticationLayout.css';

const pages = [
	{ key: 'login', path: urlPrefixes.LOGIN },
	{ key: 'register', path: urlPrefixes.REGISTER },
];

const AuthenticationLayout = () => {
	const { pathname } = useLocation();
	const { t } = useTranslation('authentication');

	const navigation = (
		<Box display='flex' flexDirection='column' height='100%'>
			<Tabs
				value={pathname}
				sx={{ borderBottom: 1, borderColor: 'divider', mb: '24px' }}
			>
				{pages.map((page) => (
					<Tab
						key={page.key}
						label={t(page.key)}
						value={page.path}
						to={`${page.path}?${new URLSearchParams(
							window.location.search,
						).toString()}`}
						component={Link}
					/>
				))}
			</Tabs>
			<Box flexGrow={1}>
				<Outlet />
			</Box>
			<Box display='flex' justifyContent='flex-end'>
				<LanguageSelect variant='standard' />
			</Box>
		</Box>
	);

	return (
		<Box
			className='authenticationlayout-page'
			style={{ backgroundImage: `url(${background})` }}
		>
			<Box
				p='12px'
				height='100%'
				minWidth='400px'
				width={{ sm: 'fit-content', xs: '100%' }}
				sx={{ bgcolor: 'whitesmoke' }}
				boxSizing='border-box'
				display='flex'
				flexGrow={1}
				flexDirection='column'
			>
				<Typography variant='h2'>Logo</Typography>
				<Box flexGrow={1}>{navigation}</Box>
			</Box>
		</Box>
	);
};

export default AuthenticationLayout;
