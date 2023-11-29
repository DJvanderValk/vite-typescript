import { useEffect, useState } from 'react';

const mediaQueryListEvent = window.matchMedia('(prefers-color-scheme: dark)');

const useSystemDarkTheme = () => {
	const [isDarkTheme, setIsDarkTheme] = useState(mediaQueryListEvent.matches);

	useEffect(() => {
		mediaQueryListEvent.onchange = () =>
			setIsDarkTheme(mediaQueryListEvent.matches);

		return () => {
			mediaQueryListEvent.onchange = () => null;
		};
	}, []);

	return isDarkTheme;
};

export default useSystemDarkTheme;
