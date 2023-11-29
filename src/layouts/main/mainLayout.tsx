import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header, NavigationBar } from '~components';

const MainLayout = () => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			sx={{ width: '100%', height: '100%' }}
		>
			<Header />
			<Box display='flex' flexGrow={1}>
				<NavigationBar />
				<Box display='block' flexGrow={1} sx={{ overflowY: 'hidden' }}>
					<Outlet />
				</Box>
			</Box>
		</Box>
	);
};

export default MainLayout;
