import { RefObject, useEffect, useState } from 'react';

interface Args extends IntersectionObserverInit {
	
}

interface IntersectionObserverProps {
	elementRef: RefObject<Element>,
	options: IntersectionObserverInit
}

const useIntersectionObserver = (props: IntersectionObserverProps): IntersectionObserverEntry | undefined => {
	const [entry, setEntry] = useState<IntersectionObserverEntry>();

	const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
		setEntry(entry);
	};

	useEffect(() => {
		const node = props.elementRef?.current; // DOM Ref

		const observer = new IntersectionObserver(updateEntry, props.options);

		observer.observe(node);

		return () => observer.disconnect();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.elementRef?.current]);
	return entry;
};

useIntersectionObserver.defaultProps = {
	options: {
		threshold: 0,
		root: null,
		rootMargin: '0%'
	}
};

// useIntersectionObserver.options = {
// 	threshold = 0
// }

export default useIntersectionObserver;
