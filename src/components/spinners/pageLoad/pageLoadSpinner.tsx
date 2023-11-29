import React from 'react';

import { Box, CircularProgress, Typography } from '@mui/material';

interface PageLoadSpinnerProps {
	text: string;
}

const PageLoadSpinner = (props: PageLoadSpinnerProps) => {
	return (
		<Box
			display='flex'
			alignItems='center'
			justifyContent='center'
			width='100%'
			height='100%'
		>
			<Box sx={{ textAlign: 'center' }}>
				<CircularProgress />
				<Typography variant='h4'>{props.text}</Typography>
			</Box>
		</Box>
	);
};

export default PageLoadSpinner;
