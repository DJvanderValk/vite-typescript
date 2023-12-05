import React, { useEffect, useRef, useState } from 'react';

import {
	Adb as AdbIcon,
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
	Menu as MenuIcon,
} from '@mui/icons-material';
import {
	Box,
	Drawer,
	Tabs,
	Tab,
	useMediaQuery,
	Toolbar,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Collapse,
	List,
	ListItemButton,
	ListItemText,
	ListItemIcon,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { navigationBarOpenAtom, userRoleAtom } from '~atoms';
import { urlPrefixes } from '~constants';
import { UserRoleEnum } from '~enums';

const mainPages = [
	{ key: 'home', label: 'home', path: urlPrefixes.HOME },
	{ key: 'wizard', label: 'wizard', path: urlPrefixes.WIZARD },
	{
		key: 'admin',
		role: UserRoleEnum.Admin,
		label: 'admin',
		path: urlPrefixes.ADMIN,
	},
];

const extraPages = [
	{ key: 'settings', label: 'settings', path: urlPrefixes.SETTINGS },
];

const drawerWidth = '100px';

const tags = [{ key: 'manufacturing' }, { key: 'sales' }, { key: 'logs' }];
const temp = [
	{ key: 'dashboard', path: '/' },
	{ key: 'devices', path: '/manufacturing/devices', tag: tags[0].key },
	{ key: 'inventory', path: '/manufacturing/inventory', tag: tags[0].key },
	{ key: 'income', path: '/sales/inventory', tag: tags[1].key },
	{ key: 'expense', path: '/sales/expense', tag: tags[1].key },
];

const NavigationBar = () => {
	const { t } = useTranslation('general');
	const { pathname } = useLocation();

	const navigationBarOpen = useRecoilValue(navigationBarOpenAtom);
	const userRole = useRecoilValue(userRoleAtom);

	const theme = useTheme();
	const greaterThanMd = useMediaQuery(theme.breakpoints.up('md'));

	const [expandedTags, setExpandedTags] = useState<string[]>([]);

	const handleClick = (key: string) => {
		const i = expandedTags.indexOf(key);
		if (i < 0) {
			setExpandedTags((prev) => [...prev, key]);
		} else {
			const newExpandedTags = expandedTags.filter((el) => el !== key);
			setExpandedTags(newExpandedTags);
		}
	};

	const content = (
		<List sx={{ width: '100%' }} disablePadding>
			{tags.map((tag) => (
				<>
					<ListItemButton key={tag.key} onClick={() => handleClick(tag.key)}>
						<ListItemIcon>
							{expandedTags.includes(tag.key) ? (
								<ExpandMoreIcon />
							) : (
								<ExpandLessIcon />
							)}
						</ListItemIcon>
						<ListItemText primary={tag.key} />
					</ListItemButton>
					<Collapse
						in={expandedTags.includes(tag.key)}
						timeout='auto'
						unmountOnExit
					>
						{temp
							.filter((el) => el.tag === tag.key)
							.map((el) => (
								<List key={el.key} component='div' disablePadding>
									<ListItemButton
										component={Link}
										to={el.path}
										selected={pathname === el.path}
									>
										<ListItemText primary={el.key} />
									</ListItemButton>
								</List>
							))}
					</Collapse>
				</>
			))}
		</List>
	);

	const content3 = (
		<Tabs value={pathname} orientation='vertical'>
			{tags.map((tag) => (
				<Accordion key={tag.key}>
					<AccordionSummary id={tag.key}>{tag.key}</AccordionSummary>
					<AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
						{temp
							.filter((el) => el.tag === tag.key)
							.map((page) => (
								<Tab
									key={page.key}
									label={page.key}
									value={page.path}
									to={page.path}
									component={Link}
								/>
							))}
					</AccordionDetails>
				</Accordion>
			))}
		</Tabs>
	);

	const content2 = (
		<Tabs
			value={
				[...mainPages, ...extraPages].some((el) => el.path === pathname)
					? pathname
					: false
			}
			orientation='vertical'
			sx={{
				height: '100%',
				'& .MuiTabs-flexContainerVertical': {
					height: '100%',
				},
			}}
		>
			{mainPages.map((page) => (
				<Tab
					key={page.key}
					label={page.label}
					value={page.path}
					to={page.path}
					component={Link}
					sx={{ alignItems: 'start' }}
				/>
			))}
			<Tab disabled sx={{ flexGrow: 1 }} />
			{extraPages.map((page) => (
				<Tab
					key={page.key}
					label={page.label}
					value={page.path}
					to={page.path}
					component={Link}
					sx={{ alignItems: 'start' }}
				/>
			))}
		</Tabs>
	);

	if (!greaterThanMd) {
		return (
			<Drawer
				anchor='left'
				open={navigationBarOpen}
				variant='persistent'
				sx={{
					height: '100%',
					transition: theme.transitions.create('width', {
						easing: theme.transitions.easing.sharp,
						duration: theme.transitions.duration.leavingScreen,
					}),
					width: 0,
					...(navigationBarOpen && {
						transition: theme.transitions.create('width', {
							easing: theme.transitions.easing.easeOut,
							duration: theme.transitions.duration.enteringScreen,
						}),
						width: drawerWidth,
					}),
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						transition: theme.transitions.create('width', {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.leavingScreen,
						}),
						width: 0,
						...(navigationBarOpen && {
							transition: theme.transitions.create('width', {
								easing: theme.transitions.easing.easeOut,
								duration: theme.transitions.duration.enteringScreen,
							}),
							width: drawerWidth,
						}),
						boxSizing: 'border-box',
					},
				}}
			>
				<Toolbar />
				{content}
			</Drawer>
		);
	}

	return (
		<Box borderRight={1} borderColor='lightgrey' height='100%'>
			{content}
		</Box>
	);
};

export default NavigationBar;
