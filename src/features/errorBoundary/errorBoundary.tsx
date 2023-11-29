import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
	children?: React.ReactNode;
}

interface State {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
	public state: State = {
		hasError: false
	};

	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	public render() {
		if (!this.state.hasError) {
			return this.props.children;
		}

		return (
			<Box>
				<Typography>Oops, something went wrong</Typography>
				<Button reloadDocument component={Link} to=''>Home</Button>
			</Box>
		);
	}
}

export default ErrorBoundary;
