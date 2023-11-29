import React, { useEffect } from 'react';

import { PageProps } from '~pages/types';

const AboutPage = (props: PageProps) => {
	useEffect(() => {
		document.title = props.title;
	}, []);
	
	return <>About page</>;
};

export default AboutPage;
