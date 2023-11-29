import React, { useEffect, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { ErrorBoundary } from '~features';
import { PageProps } from '~pages/types';

import './homePage.css';

const HomePage = (props: PageProps) => {
	useEffect(() => {
		document.title = props.title;
	}, []);
	
	const [mockCrash, setMockCrash] = useState(false);

	return (
		<Box>
			<Typography>Text ldsjkfj klsdjflkadjklfjlda jfkldj lkfajk</Typography>
			<Button variant='contained'>Super brede ajfklsdjla fjaksdf</Button>
			<Button onClick={() => setMockCrash(true)} variant='contained'>
				Crash test dummy
			</Button>
			{mockCrash ? henk : 'Test'}
		</Box>
	);
};

export default HomePage;
