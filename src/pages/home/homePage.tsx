import React, { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { PageProps } from '~pages/types';

import './homePage.css';

const HomePage = (props: PageProps) => {
	useEffect(() => {
		document.title = props.title;
	}, []);

	const position: [number, number] = [52.092, 5.104];

	return (
		<Box>
			<Typography>Text ldsjkfj klsdjflkadjklfjlda jfkldj lkfajk</Typography>
			<Button variant='contained'>Super brede ajfklsdjla fjaksdf</Button>
		</Box>
	);
};

export default HomePage;
