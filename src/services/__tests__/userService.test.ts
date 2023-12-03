import { expect, describe, it, beforeAll } from 'vitest';

import UserService from '../userService';

const userService = new UserService();

describe('test', () => {	
	it('1', () => {
		expect(1).toBe(1);
	});
	
	it('authentication should succeed', async () => {
		const henk = await service.authenticate('macho@bv.nl', 'maaktnietuit');
		expect(henk).toBe(true);
	});
	
	// it('authentication should succeed', async () => {
	// 	const henk = await userService.authenticate('macho@bv.nl', 'maaktnietuit');
	// 	expect(henk).toBe(true);
	// });
	
	// it('authentication should fail', async () => {
	// 	const henk = await userService.authenticate('macho@bv.nl', 'maaktnietuit');
	// 	console.log(henk)
	// 	expect(henk).toBe(false);
	// });
	
	
});
