const urlPrefixes = {
	ABOUT: '/about',
	ADMIN: '/admin',
	CHANGELOG: '/changelog',
	PROFILE: '/profile',
	HELP: '/help',
	HOME: '/',
	LOGIN: '/login',
	LOGOUT: '/logout',
	REGISTER: '/register',
	SANDBOX: '/sandbox',
	SETTINGS: '/settings',
	VERIFICATION: '/verification',
	WIZARD: '/wizard',
};

const urlRelativePrefixes = {
	VERIFICATION_RELATIVE: urlPrefixes.VERIFICATION.replace('/', ''),
};

export default { ...urlPrefixes, ...urlRelativePrefixes };
