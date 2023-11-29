import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { PageLoadSpinner } from '~components';
import { urlPrefixes } from '~constants';
import { PageProps } from '~pages/types';
import { UserService } from '~services';

const LogoutPage = (props: PageProps) => {
	const { t } = useTranslation('authentication');
	const location = useLocation();
	const navigate = useNavigate();

	const [signedOut, setSignedOut] = useState(false);

	const userService = new UserService();

	useEffect(() => {
		document.title = props.title;
		
		userService.signOut();
		setSignedOut(true);
	}, []);

	useEffect(() => {
		const state = location.state;
		if (signedOut) {
			navigate(urlPrefixes.LOGIN, { state: state });
		}
	}, [signedOut]);

	return <PageLoadSpinner text={t('signingOut')} />;
};

export default LogoutPage;
