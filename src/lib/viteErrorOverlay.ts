const showErrorOverlay = (err: any) => {
	// Must be within function call because that's when the element is defined for sure.
	const ErrorOverlay = customElements.get('vite-error-overlay');
	// Don't open outside vite environment
	if (!ErrorOverlay) {
		return;
	}
	console.log(err);
	const overlay = new ErrorOverlay(err);
	document.body.appendChild(overlay);
};

window.addEventListener('error', showErrorOverlay);
window.addEventListener('unhandledrejection', ({ reason }) =>
	showErrorOverlay(reason),
);
