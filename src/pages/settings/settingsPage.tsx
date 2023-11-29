import React, { useEffect } from 'react';

import {
	DarkMode as DarkModeIcon,
	LightMode as LightModeIcon,
	SettingsSuggest as SettingsSuggestIcon,
} from '@mui/icons-material';
import { ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

import { themeAtom } from '~atoms';
import { LanguageSelect } from '~components';
import { ThemeEnum } from '~enums';
import { PageProps } from '~pages/types';

const SettingsPage = (props: PageProps) => {
	const { t } = useTranslation('general');

	const [theme, setTheme] = useRecoilState(themeAtom);

	useEffect(() => {
		document.title = props.title;
	}, []);
	
	const handleThemeChange = (
		event: React.MouseEvent<HTMLElement>,
		newTheme: ThemeEnum | null,
	) => {
		if (newTheme != null) {
			setTheme(newTheme);
		}
	};

	return (
		<>
			<Typography variant='h2'>{t('theme')}</Typography>
			<ToggleButtonGroup
				exclusive
				value={theme}
				onChange={handleThemeChange}
				aria-label='theme selection'
			>
				<ToggleButton value={ThemeEnum.Light}>
					<LightModeIcon />
					<Typography variant='body1'>{t('light')}</Typography>
				</ToggleButton>
				<ToggleButton value={ThemeEnum.Dark}>
					<DarkModeIcon />
					<Typography variant='body1'>{t('dark')}</Typography>
				</ToggleButton>
				<ToggleButton value={ThemeEnum.System}>
					<SettingsSuggestIcon />
					<Typography variant='body1'>{t('system')}</Typography>
				</ToggleButton>
			</ToggleButtonGroup>

			<Typography variant='h2'>{t('language')}</Typography>
			<LanguageSelect variant='outlined' />
		</>
	);
};

export default SettingsPage;
