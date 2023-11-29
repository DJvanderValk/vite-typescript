import React, { useEffect } from 'react';

import { useSearchParams } from 'react-router-dom';

import { queryParameters } from '~constants';
import { Login } from '~features';
import { PageProps } from '~pages/types';

import './loginPage.css';

const LoginPage = (props: PageProps) => {
	const [searchParams] = useSearchParams();

	useEffect(() => {
		document.title = props.title;
	}, []);
	
	return <Login user={searchParams.get(queryParameters.USER) ?? ''} />;
};

export default LoginPage;
