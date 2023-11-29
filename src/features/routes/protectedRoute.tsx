import React, { useEffect, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userRoleAtom } from '~atoms';
import { PageLoadSpinner } from '~components';
import { urlPrefixes } from '~constants';
import { UserRoleEnum } from '~enums';
import { NotAuthorizedPage } from '~pages';
import { UserService } from '~services';

interface ProtectedRouteProps {
	minimumRole: UserRoleEnum;
}

/**
 * A route that is only available when a user is logged in
 * @returns
 */
const ProtectedRoute = (props: ProtectedRouteProps) => {
	const { t } = useTranslation('authentication');

	const userService = new UserService();

	const location = useLocation();

	const [loading, setLoading] = useState(true);
	const [authenticated, setAuthenticated] = useState(false);

	const userRole = useRecoilValue(userRoleAtom);

	useEffect(() => {
		window.addEventListener('focus', handleTabFocus);
		return () => {
			window.removeEventListener('focus', handleTabFocus);
		};
	}, []);

	useEffect(() => {
		authenticate();
	}, [location]);

	/**
	 * Handle when the window in the browser gets active
	 */
	const handleTabFocus = () => {
		authenticate();
	};

	/**
	 * Authenticate the user
	 */
	const authenticate = async () => {
		setLoading(true);

		let res = userService.checkTokenValidity();
		if (!res) {
			res = await userService.refreshToken();
		}

		setLoading(false);
		setAuthenticated(res);
	};

	const isAuthorized = () => {
		return userRole >= props.minimumRole;
	};

	if (loading) {
		return <PageLoadSpinner text={t('authenticating')} />;
	} else if (!authenticated) {
		return (
			<Navigate to={urlPrefixes.LOGIN} state={{ from: location }} replace />
		);
	} else if (!isAuthorized()) {
		return <NotAuthorizedPage />;
	}

	return <Outlet />;
};

ProtectedRoute.defaultProps = {
	minimumRole: UserRoleEnum.User,
};

export default ProtectedRoute;
