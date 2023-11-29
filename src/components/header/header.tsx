import React, { useState } from 'react';

import {
	Adb as AdbIcon,
	Menu as MenuIcon,
} from '@mui/icons-material';
import {
	Avatar,
	AppBar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import machoImg from '~assets/macho.jpg';
import { navigationBarOpenAtom } from '~atoms';
import { urlPrefixes } from '~constants';

const options = [{ key: 'logout', label: 'logout', path: urlPrefixes.LOGOUT }];

const Header = () => {
	const { t } = useTranslation('general');

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
	const [navigationBarOpen, setNavigationBarOpen] = useRecoilState(
		navigationBarOpenAtom,
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const logoAndText = (
		<Box
			display='flex'
			flexDirection='row'
			component={Link}
			to={urlPrefixes.HOME}
			sx={{
				textDecoration: 'none',
				color: 'inherit',
			}}
			alignItems='center'
		>
			<AdbIcon sx={{ mr: 1 }} />
			<Typography
				variant='h6'
				noWrap
				sx={{
					fontFamily: 'monospace',
					fontWeight: 700,
					letterSpacing: '.3rem',
					color: 'inherit',
				}}
			>
				LOGO
			</Typography>
		</Box>
	);

	return (
		<AppBar
			position='static'
			color='primary'
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar>
				<Box display={{ xs: 'flex', md: 'none' }}>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						onClick={() => setNavigationBarOpen((prev) => !prev)}
						color='inherit'
					>
						<MenuIcon />
					</IconButton>
				</Box>

				<Box
					flexGrow={1}
					display={{ xs: 'flex', md: 'none' }}
					justifyContent='center'
				>
					{logoAndText}
				</Box>

				<Box flexGrow={1} display={{ xs: 'none', md: 'flex' }}>
					{logoAndText}
				</Box>

				<Box>
					<Tooltip title='Open settings'>
						<IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
							<Avatar src={machoImg} alt='Macho' />
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: '45px' }}
						id='menu-appbar'
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						{options.map((options) => (
							<MenuItem component={Link} to={options.path} key={options.key}>
								<Typography textAlign='center'>{t(options.label)}</Typography>
							</MenuItem>
						))}
					</Menu>
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
