import React, { useEffect, useState } from 'react';

import { TextField, Typography } from '@mui/material';

interface Data {
	name: string;
	description: string;
}

interface DescriptionProps {
	data: Data;
	onChange: (data: Data) => void;
}

const Description = (props: DescriptionProps) => {
	const [data, setData] = useState(props.data);

	useEffect(() => {
		props.onChange(data);
	}, [data]);

	return (
		<>
			<Typography>Name</Typography>
			<TextField
				value={data.name}
				onChange={(e) => setData({ ...data, name: e.target.value })}
			/>
			<Typography>Description</Typography>
			<TextField
				value={data.description}
				onChange={(e) => setData({ ...data, description: e.target.value })}
			/>
		</>
	);
};

Description.defaultProps = {
	data: { name: '', description: '' },
	onChange: () => null,
};

export default Description;
