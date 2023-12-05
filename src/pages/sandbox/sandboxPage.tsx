import React, { useState } from 'react';

import useSWR from 'swr';
import { Box, Button, TextField } from '@mui/material';

import { BoredService } from '~services';

import './SandboxPage.css';
import { useSearchParams } from 'react-router-dom';

const changeMeForPwaUpdate = 5;

const boredService = new BoredService();

const SandboxPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [shouldFetch, setShouldFetch] = useState(false);
	const { data, error, isLoading } = useSWR(
		shouldFetch ? null : '/api/activity',
		boredService.getActivity,
	);

	const handleClick = () => {
		setShouldFetch(true);
	};

	const handleChange = (value) => {
		if (value === '') {
			searchParams.delete('bla');
			setSearchParams(searchParams, { replace: true });
			return;
		}

		setSearchParams((prev) => ({ ...prev, ['bla']: value }), { replace: true });
	};
	
	

	return (
		<Box width={1} height={1} display='flex'>
			<Button onClick={handleClick}>Click</Button>
			{data ? data.activity : 'nog niks'}
			<TextField
				value={searchParams.get('bla') ?? ''}
				onChange={(e) => handleChange(e.target.value)}
			/>
		</Box>
	);
};

export default SandboxPage;
