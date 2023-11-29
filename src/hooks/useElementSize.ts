import { useEffect, useState } from 'react';

export const useContainerDimensions = (myRef) => {
	const [size, setSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const getDimensions = () => ({
			width: myRef.current.offsetWidth,
			height: myRef.current.offsetHeight,
		});

		const handleResize = () => {
			setSize(getDimensions());
		};

		if (myRef.current) {
			setSize(getDimensions());
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [myRef]);

	return size;
};
