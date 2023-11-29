import React from 'react';

import {
	MenuItem,
	Select,
	SelectChangeEvent,
	SelectProps,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { LanguageEnum } from '~enums';

const supportedLanguages = Object.keys(LanguageEnum);

const LanguageSelect = (props: SelectProps) => {
	const { i18n } = useTranslation('general');

	/**
	 * Handle the change of language
	 */
	const handleLanguageChange = (event: SelectChangeEvent<unknown>) => {
		i18n.changeLanguage(event.target.value as string);
	};

	return (
		<Select
			{...props}
			value={i18n.resolvedLanguage}
			onChange={handleLanguageChange}
		>
			{supportedLanguages.map((lang: string, i: number) => (
				<MenuItem
					key={i}
					value={Object.values(LanguageEnum)[supportedLanguages.indexOf(lang)]}
				>
					{`${lang.charAt(0).toUpperCase()}${lang.slice(1).toLowerCase()}`}
				</MenuItem>
			))}
		</Select>
	);
};

export default LanguageSelect;
