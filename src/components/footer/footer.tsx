import React from 'react';

import {
	AddAPhoto as AddAPhotoIcon,
	SettingsVoice as SettingsVoiceIcon,
} from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

import './footer.css';

const Footer = () => {
	return (
		<Box className='footer'>
			<IconButton>
				<SettingsVoiceIcon />
			</IconButton>

			<IconButton>
				<AddAPhotoIcon />
			</IconButton>
		</Box>
	);
};

export default Footer;
