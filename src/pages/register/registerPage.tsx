import React, { useEffect } from 'react';

import { Registration } from '~features';
import { PageProps } from '~pages/types';

import './registerPage.css';

const RegisterPage = (props: PageProps) => {
	useEffect(() => {
		document.title = props.title;
	}, []);
	
	return <Registration />;
};

export default RegisterPage;
