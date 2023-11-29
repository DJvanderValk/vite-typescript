import React, { useEffect, useRef, useState } from 'react';

const useHeadersObserver = () => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const [activeId, setActiveId] = useState('');

	useEffect(() => {
		const handleObserver = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry: IntersectionObserverEntry) => {
				if (entry?.isIntersecting) {
					setActiveId(entry.target.id);
				}
			});
		};

		observerRef.current = new IntersectionObserver(handleObserver, {
			rootMargin: '-0% 0% -35% 0px',
		});

		const elements = document.querySelectorAll('h2, h3');
		elements.forEach((elem) => observerRef.current.observe(elem));

		return () => observerRef.current.disconnect();
	}, []);

	return activeId;
};

export default useHeadersObserver;
