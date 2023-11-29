import React, { useEffect, useState } from 'react';

import { Rating, TextField, Typography } from '@mui/material';

interface Data {
	rating: number | null;
}

interface RatingSelectionProps {
	data: Data;
	onChange: (data: Data) => void;
}

const RatingSelection = (props: RatingSelectionProps) => {
	const [data, setData] = useState(props.data);

	useEffect(() => {
		props.onChange(data);
	}, [data]);

	return (
		<>
			<Typography>Rating</Typography>
			<Rating
				value={data.rating}
				onChange={(e, newValue) => setData({ ...data, rating: newValue })}
			/>
		</>
	);
};

RatingSelection.defaultProps = {
	data: { rating: null },
	onChange: () => null,
};

export default RatingSelection;
