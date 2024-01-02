import React, { useEffect } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Route, Routes, createBrowserRouter, useSearchParams } from 'react-router-dom';

import { generalInformation, queryParameters, urlPrefixes } from '~constants';
import { LanguageEnum, UserRoleEnum } from '~enums';
import { ProtectedRoute, PublicRoute } from '~features/authentication';
import { AuthenticationLayout, MainLayout } from '~layouts';
import {
	AboutPage,
	AdminPage,
	HelpPage,
	HomePage,
	LoginPage,
	LogoutPage,
	NotFoundPage,
	RegisterPage,
	SandboxPage,
	SettingsPage,
	WizardPage,
} from '~pages';

import AppTheme from './themes/theme';
import './app.css';

/**
 * Setup the app and its routing
 */
const App = () => {
	const { i18n, t } = useTranslation();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const lang = searchParams.get(queryParameters.LANGUAGE);
		if (lang && Object.values<string>(LanguageEnum).includes(lang)) {
			i18n.changeLanguage(lang);
		}
	}, [searchParams]);

	/**
	 * Create a full document title
	 * @param title The title of the page
	 */
	const buildDocumentTitle = (title: string) => {
		return `${title} - ${generalInformation.APP_NAME}`;
	};
	
	const router = createBrowserRouter([
		{
			element: <PublicRoute />,
			children: [
				
			]
		}
	]);

	return (
		<ThemeProvider theme={AppTheme()}>
			<div className='app'>
				<Routes>

					<Route element={<PublicRoute />}>
						<Route element={<AuthenticationLayout />}>
							<Route
								path={urlPrefixes.LOGIN}
								element={<LoginPage title={buildDocumentTitle(t('login'))} />}
							/>
							<Route
								path={urlPrefixes.REGISTER}
								element={
									<RegisterPage title={buildDocumentTitle(t('register'))} />
								}
							>
								<Route path={urlPrefixes.VERIFICATION_RELATIVE} />
							</Route>
						</Route>
					</Route>

					<Route element={<MainLayout />}>
						{import.meta.env.DEV && (
							<Route path={urlPrefixes.SANDBOX} element={<SandboxPage />} />
						)}
						<Route
							path={urlPrefixes.HELP}
							element={<HelpPage />}
						/>
						<Route element={<ProtectedRoute />}>
							<Route
								path={urlPrefixes.HOME}
								element={<HomePage title={buildDocumentTitle(t('home'))} />}
							/>
							<Route
								path={urlPrefixes.ABOUT}
								element={<AboutPage title={buildDocumentTitle(t('about'))} />}
							/>
							<Route
								path={urlPrefixes.LOGOUT}
								element={<LogoutPage title={buildDocumentTitle(t('logout'))} />}
							/>
							<Route
								path={urlPrefixes.SETTINGS}
								element={
									<SettingsPage title={buildDocumentTitle(t('settings'))} />
								}
							/>
							<Route
								path={urlPrefixes.WIZARD}
								element={<WizardPage title={buildDocumentTitle(t('wizard'))} />}
							/>
							<Route
								path='*'
								element={
									<NotFoundPage title={buildDocumentTitle(t('notFound'))} />
								}
							/>
						</Route>
						<Route
							element={<ProtectedRoute minimumRole={UserRoleEnum.Admin} />}
						>
							<Route
								path={urlPrefixes.ADMIN}
								element={<AdminPage title={buildDocumentTitle(t('admin'))} />}
							/>
						</Route>
					</Route>
				</Routes>
			</div>
		</ThemeProvider>
	);
};

export default App;
