import { atom } from 'recoil';

import { UserRoleEnum } from '~enums';

const userRoleAtom = atom<UserRoleEnum>({
	key: 'userRoleAtom',
	default: UserRoleEnum.User,
});

export default userRoleAtom;
