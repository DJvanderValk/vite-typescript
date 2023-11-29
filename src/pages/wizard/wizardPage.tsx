import React, { useEffect, useState } from 'react';

import {
	Box,
	Button,
	Step,
	StepLabel,
	Stepper,
	TextField,
	Typography,
} from '@mui/material';
import Ajv from 'ajv';

import { PageProps } from '~pages/types';

import Description from './description/description';
import descriptionSchema from './description/descriptionSchema.json';
import FeatureSelection from './featureSelection/featureSelection';
import RatingSelection from './ratingSelection/ratingSelection';
import ratingSelectionSchema from './ratingSelection/ratingSelectionSchema.json';

const ajv = new Ajv();
let validate = ajv.compile(descriptionSchema);

const WizardPage = (props: PageProps) => {
	const [data, setData] = useState({
		name: '',
		description: '',
		rating: null,
		gps: false,
		wifi: false,
		bluetooth: false,
	});
	const [activeStep, setActiveStep] = useState(0);
	const [valid, setValid] = useState(false);

	useEffect(() => {
		document.title = props.title;
	}, []);
	
	useEffect(() => {
		switch (activeStep) {
			case 0:
				validate = ajv.compile(descriptionSchema);
				break;
			case 1:
				validate = ajv.compile(ratingSelectionSchema);
				break;
		}
		setValid(validate(data));
	}, [activeStep]);

	useEffect(() => {
		setValid(validate(data));
	}, [data]);

	const steps = [
		{
			label: 'Create this',
			component: (
				<Description
					data={data}
					onChange={(val) => setData({ ...data, ...val })}
				/>
			),
			valid: false,
		},
		{
			label: 'Rate me',
			component: (
				<RatingSelection
					data={data}
					onChange={(val) => setData({ ...data, ...val })}
				/>
			),
			valid: false,
		},
		{
			label: 'Select features',
			component: (
				<FeatureSelection
					data={data}
					onChange={(val) => setData({ ...data, ...val })}
				/>
			),
			valid: false,
		},
	];

	return (
		<Box
			width='100%'
			height='100%'
			p='10px'
			boxSizing='border-box'
			display='flex'
			flexDirection='column'
		>
			<Stepper activeStep={activeStep}>
				{steps.map((el, i) => (
					<Step key={i}>
						<StepLabel>{el.label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Box flexGrow={1} m='30px'>
				{steps[activeStep].component}
			</Box>
			<Box width='100%' display='flex' justifyContent='space-between'>
				<Button
					onClick={() => setActiveStep(activeStep - 1)}
					disabled={activeStep <= 0}
				>
					Back
				</Button>
				{activeStep < steps.length ? (
					<Button
						variant='contained'
						onClick={() => setActiveStep(activeStep + 1)}
						disabled={!valid}
					>
						{activeStep < steps.length - 1 ? 'Next' : 'Finish'}
					</Button>
				) : (
					<Box />
				)}
			</Box>
		</Box>
	);
};

export default WizardPage;
