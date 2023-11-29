import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { ThemeEnum } from '~enums';

const { persistAtom } = recoilPersist();

const themeAtom = atom<ThemeEnum>({
	key: 'themeAtom',
	default: ThemeEnum.Light,
	effects_UNSTABLE: [persistAtom],
});

export default themeAtom;
