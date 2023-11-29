import { useMemo } from 'react';

import { createTheme } from '@mui/material';
import { useRecoilValue } from 'recoil';

import { themeAtom } from '~atoms';
import { ThemeEnum } from '~enums';
import { useSystemDarkTheme } from '~hooks';

import baseTheme from './baseTheme';
import darkTheme from './darkTheme';
import lightTheme from './lightTheme';

// const isSystemThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const AppTheme = () => {
	const theme = useRecoilValue(themeAtom);
	const isSystemThemeDark = useSystemDarkTheme();

	return useMemo(
		() =>
			createTheme(
				baseTheme,
				(theme === ThemeEnum.System && isSystemThemeDark) ||
					theme === ThemeEnum.Dark
					? darkTheme
					: lightTheme,
			),
		[theme, isSystemThemeDark],
	);
};

export default AppTheme;
