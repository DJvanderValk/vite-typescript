import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode, command }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

	// if(command === 'serve') {
	// 	console.log(command)
	// };

	return defineConfig({
		assetsInclude: [
			'**/*.md'
		],
		plugins: [
			react()
		],
		resolve: {
			alias: {
				'~assets': path.resolve(__dirname, 'src', 'assets'),
				'~atoms': path.resolve(__dirname, 'src', 'atoms'),
				'~components': path.resolve(__dirname, 'src', 'components'),
				'~constants': path.resolve(__dirname, 'src', 'constants'),
				'~docs': path.resolve(__dirname, 'docs'),
				'~enums': path.resolve(__dirname, 'src', 'enums'),
				'~features': path.resolve(__dirname, 'src', 'features'),
				'~hooks': path.resolve(__dirname, 'src', 'hooks'),
				'~layouts': path.resolve(__dirname, 'src', 'layouts'),
				'~pages': path.resolve(__dirname, 'src', 'pages'),
				'~services': path.resolve(__dirname, 'src', 'services'),
				'~themes': path.resolve(__dirname, 'src', 'themes'),
			}
		},
		server: {
			port: parseInt(process.env.PORT)
		}
	});
};
