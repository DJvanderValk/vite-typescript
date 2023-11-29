import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { queryParameters } from '~constants';

i18n
	.use(initReactI18next)
	.use(Backend)
	.use(LanguageDetector)
	.init({
		backend: {
			loadPath: '/locales/{{lng}}/{{ns}}.json',
		},
		fallbackLng: ['en'],
		supportedLngs: ['en', 'nl'],
		debug: import.meta.env.NODE_ENV === 'development',
		ns: ['general'],
		defaultNS: 'general',
		interpolation: {
			escapeValue: false,
		},
		keySeparator: '.',
	});

// Sync the language to the url after initialization
i18n.on('initialized', () => {
	i18n.on('languageChanged', (lang) => {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.get(queryParameters.LANGUAGE) === lang) {
			return;
		}

		searchParams.set(queryParameters.LANGUAGE, lang);
		const newUrl = `${window.location.origin}${
			window.location.pathname
		}?${searchParams.toString()}`;
		window.history.replaceState({ path: newUrl }, '', newUrl);
	});
});

export default i18n;
