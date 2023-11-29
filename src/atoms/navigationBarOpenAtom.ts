import { atom } from 'recoil';

const navigationBarOpenAtom = atom<boolean>({
	key: 'navigationBarOpenAtom',
	default: true,
});

export default navigationBarOpenAtom;
