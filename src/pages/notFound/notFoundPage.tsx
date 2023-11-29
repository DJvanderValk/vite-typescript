import React, { useEffect } from 'react';

import { SearchOff as SearchOffIcon } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PageProps } from '~pages/types';

import './notFoundPage.css';

const NotFoundPage = (props: PageProps) => {
	const { t } = useTranslation('general');

	useEffect(() => {
		document.title = props.title;
	}, []);
	
	return (
		<Box
			width='100%'
			height='100%'
			justifyContent='center'
			p='30px'
			boxSizing='border-box'
		>
			<Stack direction='row' alignItems='center' spacing={3}>
				<SearchOffIcon fontSize='large' />
				<Box>
					<Typography variant='h2'>404</Typography>
					<Typography variant='body1'>
						{t('pageWithPathNotFound', { path: window.location.pathname })}
					</Typography>
				</Box>
			</Stack>
		</Box>
	);
};

export default NotFoundPage;
