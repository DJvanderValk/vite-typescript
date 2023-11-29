import React, { useState } from 'react';

import useSWR from 'swr';
import {
	Box, Button,
} from '@mui/material';

import { BoredService } from '~services';

import './SandboxPage.css';

const changeMeForPwaUpdate = 5;

const boredService = new BoredService();

const SandboxPage = () => {
	
	const [shouldFetch, setShouldFetch] = useState(false);
	const { data, error, isLoading } = useSWR(shouldFetch ? null : '/api/activity', boredService.getActivity);
	
	console.log(data, shouldFetch)
	
	const handleClick = () => {
		setShouldFetch(true);
	};

	return (
		<Box width={1} height={1} display='flex'>
			<Button onClick={handleClick}>Click</Button>
			{data ? data.activity : 'nog niks'}
		</Box>
	);
};

export default SandboxPage;
