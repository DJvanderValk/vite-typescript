import React, { Suspense } from 'react';

import { Box } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { RecoilURLSync, RecoilURLSyncJSON } from 'recoil-sync';

import { ErrorBoundary, PageLoadSpinner } from '~components';

import App from './app';

import './lib/viteErrorOverlay';
import './lib/i18n';
import './index.css';

if(import.meta.env.MODE === 'development') {
	import('./mocks/browser');
}

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<Suspense
		fallback={
			<Box width='100vw' height='100vh'>
				<PageLoadSpinner text='loading' />
			</Box>
		}
	>
		<RecoilRoot>
			<RecoilURLSyncJSON location={{ part: 'queryParams' }}>
				<BrowserRouter>
					<ErrorBoundary>
						<App />
					</ErrorBoundary>
				</BrowserRouter>
			</RecoilURLSyncJSON>
		</RecoilRoot>
	</Suspense>,
);
