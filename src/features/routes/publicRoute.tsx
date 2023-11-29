import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, Outlet } from 'react-router-dom';

import { PageLoadSpinner } from '~components';
import { urlPrefixes } from '~constants';
import { UserService } from '~services';

/**
 * A route that is only available if a user is not logged in
 * @returns
 */
const PublicRoute = () => {
	const { t } = useTranslation('authentication');

	const userService = new UserService();

	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		authenticate();
	}, []);

	/**
	 * Authenticate the user
	 */
	const authenticate = async () => {
		setLoading(true);

		const valid = userService.checkTokenValidity();

		setAuthenticated(valid);
		setLoading(false);
	};

	if (loading) {
		return <PageLoadSpinner text={t('authenticating')} />;
	} else if (authenticated) {
		return <Navigate to={urlPrefixes.HOME} replace />;
	}

	return <Outlet />;
};

export default PublicRoute;
