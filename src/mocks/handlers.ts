import { HttpResponse, http } from 'msw';

import { apiPrefixes } from '~constants';

interface LoginPayload {}

interface LoginResponseBody {
	accessToken: string;
	idToken: string;
	refreshToken: string;
}

interface LoginParams {}

// const privateKey = 'mxczvi45lkwjfdcvmekr209323flskdd4oadfsff423edc';
// access token is a jwt token
const accessToken =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYWNob0Bidi5ubCIsIm5hbWUiOiJNYWNobyBNYW4iLCJpYXQiOjE4MTYyMzkwMjJ9.OHGsyCk3-SwQ0LeAXYrmIB72UERfQDHIeEBN1OjrQhc';

const handlers = [
	http.post(
		new URL(apiPrefixes.LOGIN, import.meta.env.VITE_USER_SERVICE_URL).href,
		({ request }) => {
			return HttpResponse.json({
				accessToken: accessToken,
				idToken: accessToken,
				refreshToken: 'todo',
			});
		},
	),
	// http.post<LoginPayload, LoginResponseBody, LoginParams>(
	// 	new URL(apiPrefixes.LOGIN, import.meta.env.VITE_USER_SERVICE_URL).href,
	// 	(req: any, res: any, ctx: any) => {
	// 		const base64 = req.headers.get('Authorization');
	// 		const data = atob(base64.split(' ')[1]);

	// 		const username = data.split(':')[0];
	// 		const password = data.split(':')[1];

	// 		// Whatever password, just not empty
	// 		if (username === 'macho@bv.nl' && password !== '') {
	// 			return res(
	// 				ctx.delay(500),
	// 				ctx.status(200),
	// 				ctx.cookie('access_token', accessToken),
	// 				ctx.json({
	// 					accessToken: accessToken,
	// 					idToken: accessToken,
	// 					refreshToken: 'todo',
	// 				}),
	// 			);
	// 		}

	// 		return res(ctx.delay(500), ctx.status(401, 'Wrong credentials'));
	// 	},
	// ),
	// http.post<Bla, Bla, Bla>(
	// 	new URL(apiPrefixes.REFRESH, import.meta.env.VITE_USER_SERVICE_URL).href,
	// 	(req: any, res: any, ctx: any) => {
	// 		return res(ctx.delay(500), ctx.status(401, 'Wrong credentials'));
	// 	},
	// )
];

export default handlers;
