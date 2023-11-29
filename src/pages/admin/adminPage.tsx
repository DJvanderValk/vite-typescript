import React, { useEffect } from 'react';

import { PageProps } from '~pages/types';

const AdminPage = (props: PageProps) => {
	useEffect(() => {
		document.title = props.title;
	}, []);
	
	return <>Admin</>;
};

export default AdminPage;
