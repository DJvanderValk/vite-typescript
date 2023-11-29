import React, { useEffect, useState } from 'react';

import { FormControlLabel, Switch, TextField, Typography } from '@mui/material';

interface Data {
	gps: boolean;
	bluetooth: boolean;
	wifi: boolean;
}

interface FeatureSelectionProps {
	data: Data;
	onChange: (data: Data) => void;
}

const FeatureSelection = (props: FeatureSelectionProps) => {
	const [data, setData] = useState(props.data);

	useEffect(() => {
		props.onChange(data);
	}, [data]);

	return (
		<>
			<FormControlLabel
				required
				control={
					<Switch
						checked={data.gps}
						onChange={(e) => setData({ ...data, gps: e.target.checked })}
					/>
				}
				label='GPS'
			/>
			<FormControlLabel
				required
				control={
					<Switch
						checked={data.bluetooth}
						onChange={(e) => setData({ ...data, bluetooth: e.target.checked })}
					/>
				}
				label='Bluetooth'
			/>
			<FormControlLabel
				required
				control={
					<Switch
						checked={data.wifi}
						onChange={(e) => setData({ ...data, wifi: e.target.checked })}
					/>
				}
				label='Wifi'
			/>
		</>
	);
};

FeatureSelection.defaultProps = {
	data: {},
	onChange: () => null,
};

export default FeatureSelection;
