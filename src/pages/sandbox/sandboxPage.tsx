import React, { useEffect, useState } from 'react';

import useSWR from 'swr';
import {
	Box,
	Button,
	IconProps,
	Slider,
	SvgIconProps,
	SvgIconPropsSizeOverrides,
	TablePagination,
	TextField,
	Typography,
} from '@mui/material';

import { BoredService } from '~services';

import './SandboxPage.css';
import { useSearchParams } from 'react-router-dom';
import {
	Battery0Bar as Battery0BarIcon,
	Battery1Bar as Battery1BarIcon,
	Battery2Bar as Battery2BarIcon,
	Battery3Bar as Battery3BarIcon,
	Battery4Bar as Battery4BarIcon,
	Battery5Bar as Battery5BarIcon,
	Battery6Bar as Battery6BarIcon,
	Battery20 as Battery20Icon,
	Battery30 as Battery30Icon,
	Battery50 as Battery50Icon,
	Battery60 as Battery60Icon,
	Battery80 as Battery80Icon,
	Battery90 as Battery90Icon,
	BatteryFull as BatteryFullIcon,
	BatteryUnknown as BatteryUnknownIcon,
} from '@mui/icons-material';

const changeMeForPwaUpdate = 5;

const boredService = new BoredService();

enum tableSearchParamEnum {
	PAGE = 'p',
	PAGE_SIZE = 's',
}

const defaultPagination = {
	pageNumber: 0,
	pageSize: 10,
};

interface BatteryProps {
	value: number;
}


const Battery = (props: BatteryProps) => {
	
	const iconProps: SvgIconProps = {
		fontSize: 'medium'
	}
	
	const thresholds = [
		{
			value: 100,
			icon: <BatteryFullIcon color='success' {...iconProps} />,
			// icon: <Battery90Icon color='success' />
		},
		{
			value: 90,
			icon: <Battery6BarIcon color='success' {...iconProps} />,
			// icon: <Battery80Icon color='success' />
		},
		{
			value: 70,
			icon: <Battery5BarIcon color='success' {...iconProps} />,
			// icon: <Battery60Icon color='success' />
		},
		{
			value: 50,
			icon: <Battery4BarIcon color='success' {...iconProps} />,
			// icon: <Battery50Icon color='success' />
		},
		{
			value: 30,
			icon: <Battery3BarIcon color='warning' {...iconProps} />,
			// icon: <Battery30Icon color='success' />
		},
		{
			value: 15,
			icon: <Battery2BarIcon color='warning' {...iconProps} />,
			// icon: <Battery20Icon color='success' />
		},
		{
			value: 5,
			icon: <Battery1BarIcon color='error' {...iconProps} />,
			// icon: <BatteryFullIcon color='success' />
		},
		{
			value: 0,
			icon: <Battery0BarIcon color='error' {...iconProps} />,
		},
	];

	return (
		<Box>
			{thresholds.find((el) => props.value >= el.value)?.icon ?? <BatteryUnknownIcon />}
		</Box>
	);
};

const SandboxPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const pageNumber = Number(searchParams.get(tableSearchParamEnum.PAGE));
	const pageSize = Number(searchParams.get(tableSearchParamEnum.PAGE_SIZE));

	useEffect(() => {
		if (isNaN(pageNumber)) {
			searchParams.delete(tableSearchParamEnum.PAGE);
		}
		if (isNaN(pageSize)) {
			searchParams.delete(tableSearchParamEnum.PAGE_SIZE);
		}

		setSearchParams(searchParams, { replace: true });
	}, []);

	const handlePageChange = (e, page: number) => {
		console.log(page);
		if (page <= defaultPagination.pageNumber) {
			searchParams.delete(tableSearchParamEnum.PAGE);
			setSearchParams(searchParams, { replace: true });
			return;
		}

		setSearchParams(
			(prev) => ({ ...prev, [tableSearchParamEnum.PAGE]: page }),
			{ replace: true },
		);
	};

	const [batteryValue, setBatteryValue] = useState(100);

	return (
		<Box width={1} height={1}>
			<Slider
				value={batteryValue}
				min={-1}
				onChange={(e, value) => setBatteryValue(value)}
				sx={{ width: '100px' }}
			/>
			<Box display='flex' alignItems='center'>
				<Typography>{`${batteryValue}%`}</Typography>
				<Battery value={batteryValue} />
			</Box>
		</Box>
	);

	return (
		<>
			<TablePagination
				page={isNaN(pageNumber) ? defaultPagination.pageNumber : pageNumber}
				rowsPerPage={
					isNaN(pageSize) || pageSize <= 0
						? defaultPagination.pageSize
						: pageSize
				}
				count={110}
				onPageChange={handlePageChange}
			/>
		</>
	);
};

const SandboxPage2 = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [shouldFetch, setShouldFetch] = useState(false);
	const { data, error, isLoading } = useSWR(
		shouldFetch ? null : '/api/activity',
		boredService.getActivity,
	);

	const handleClick = () => {
		setShouldFetch(true);
	};

	const handleChange = (value: any, key: string) => {
		if (value === '') {
			searchParams.delete(key);
			setSearchParams(searchParams, { replace: true });
			return;
		}

		setSearchParams((prev) => ({ ...prev, ['bla']: value }), { replace: true });
	};

	return (
		<Box width={1} height={1} display='flex'>
			<Button onClick={handleClick}>Click</Button>
			{data ? data.activity : 'nog niks'}
			<TextField
				value={searchParams.get('bla') ?? ''}
				onChange={(e) => handleChange(e.target.value, 'bla')}
			/>
		</Box>
	);
};

export default SandboxPage;
