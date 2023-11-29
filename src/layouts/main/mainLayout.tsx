import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header, NavigationBar } from '~components';
import { ErrorBoundary } from '~features';

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
				<ErrorBoundary>
					<Box display='block' flexGrow={1} sx={{ overflowY: 'hidden' }}>
						<Outlet />
					</Box>
				</ErrorBoundary>
			</Box>
		</Box>
	);
};

export default MainLayout;
