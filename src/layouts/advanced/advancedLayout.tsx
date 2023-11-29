import React from 'react';

import { Box, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Footer, Header } from '~components';

const AdvancedLayout = () => {
	const allSidesLayout = (
		<Box
			display='flex'
			flexDirection='column'
			sx={{ width: '100%', height: '100%' }}
		>
			<Box>
				<Header />
			</Box>
			<Box display='flex' flexGrow={1}>
				<Box>Left</Box>
				<Box flexGrow={1}>
					<Outlet />
				</Box>
				<Box>Right</Box>
			</Box>
			<Box>footer</Box>
		</Box>
	);

	const headerFooterLayout = (
		<Box
			display='flex'
			flexDirection='column'
			sx={{ width: '100%', height: '100%' }}
		>
			<Box>
				<Header />
			</Box>
			<Box flexGrow={1}>
				<Outlet />
			</Box>
			<Box>
				<Footer />
			</Box>
		</Box>
	);

	const headerStickyFooterLayout = (
		<Box
			display='flex'
			flexDirection='column'
			sx={{ width: '100%', height: '100%' }}
		>
			<Box>
				<Header />
			</Box>
			<Box flexGrow={1}>
				<Outlet />
			</Box>
			<Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 500 }}>
				<Footer />
			</Box>
		</Box>
	);

	return headerStickyFooterLayout;
};

export default AdvancedLayout;
