import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import { Box, Fab, IconButton, Slide, Stack, Typography, useScrollTrigger } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import { Link, LinkProps, useLocation } from 'react-router-dom';

import helpFile from '~docs/HELP.md?raw';
import { useHeadersObserver } from '~hooks';

import './helpPage.css';
import useIntersectionObserver from '~hooks/useIntersectObserver';

const HashLink = forwardRef((props: LinkProps, ref) => {
	const pathElements = props.to.split('#');
	
	return (
		<Link ref={ref} {...props} />
	);
});
HashLink.displayName = 'HashLink';

const tocTagsInclude: (keyof React.ReactHTML)[] = ['h2', 'h3'];
const contentTagsExclude: (keyof React.ReactHTML)[] = ['h1'];

const backToTopAnchorId = 'back-to-top-anchor';

const HelpPage = () => {
	const location = useLocation();
	
	const activeHeaderId = useHeadersObserver();
	
	const ref = useRef();
	const bla = useIntersectionObserver(ref);
	console.log(bla)
	
	const [scrollTarget, setScrollTarget] = useState<Node | Window | undefined>();
	const scrollTrigger = useScrollTrigger({
		target: scrollTarget,
		disableHysteresis: true,
		threshold: 100,
	});
	
	useEffect(() => {
		if (helpFile && location.hash) {
			const id = location.hash.replace('#', '');
			const el = document.getElementById(id);
			el?.scrollIntoView({ behavior: 'smooth' });
		}
	}, [location]);
	
	const scrollToTop = () => {
		const el = document.getElementById(backToTopAnchorId);
		el?.scrollTo({ top: 0, behavior: 'smooth' });
	};
	
	const tabelOfContents = (
		<Markdown
			options={{
				wrapper: 'ul',
				createElement(tag: keyof React.ReactHTML, props, children) {
					if(tocTagsInclude.includes(tag)) {
						return (
							<HashLink
								to={`#${props.id}`}
							>
								<Typography
									component={tag === 'h3' ? 'li' : 'header'}
									variant='body1'
									// className='toc-header-link'
									{...props}
									id={props.id ? `${props.id}-toc` : undefined}
									style={{
										fontWeight: activeHeaderId === props.id ? 'bold' : 'normal',
									}}
								>
									{children}
								</Typography>
							</HashLink>
						);
					}
					
					return null;
				},
			}}
		>
			{helpFile}
		</Markdown>
	);
	
	const content = (
		<Markdown
			options={{
				// wrapper: React.Fragment,
				createElement(tag: keyof React.ReactHTML, props, children) {
					if(contentTagsExclude.includes(tag)) {
						return null;
					}
					
					if(tag === 'h2' || tag === 'h3') {
						return (
							<Box display='flex' alignItems='center'>
								<HashLink
									to={`#${props.id}`}
									// className='content-header-hash-link'
								>
									#
								</HashLink>
								<Typography {...props} variant={tag}>{children}</Typography>
							</Box>
						);
					}
					
					return React.createElement(tag, props, children);
				},
			}}
		>
			{helpFile}
		</Markdown>
	);
	
	return (
		<Box
			id={backToTopAnchorId}
			ref={(node: Node) => node && setScrollTarget(node)}
			width={1} height={1}
			sx={{ overflowY: 'auto' }}
		>
			<Stack spacing={2} direction='row' position='relative'>
				<Box ref={ref} minWidth='200px'>
					{content}
				</Box>
				<Box minWidth='200px'>
					<Typography variant='body1'>Table of content</Typography>
					<Box position='sticky' top={0} height='fit-content'>
						{tabelOfContents}
					</Box>
				</Box>
			</Stack>
			<Box position='sticky' bottom={0} display='flex' justifyContent='flex-end'>
				<Slide direction='up' in={scrollTrigger}>
					<IconButton component={HashLink} to='#' onClick={scrollToTop}>
						<ArrowUpwardIcon />
					</IconButton>
				</Slide>
			</Box>
		</Box>
	);
};

export default HelpPage;
