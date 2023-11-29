import { number } from '@recoiljs/refine';
import { DefaultValue, atom } from 'recoil';
import { urlSyncEffect } from 'recoil-sync';

const mapPositionAtom = atom<number>({
	key: 'mapZoomAtom',
	default: 7,
	effects: [
		urlSyncEffect({
			refine: number(),
			read: ({ read }) => {
				const value = read('z');
				if (value instanceof DefaultValue) {
					return new DefaultValue();
				}
				return value;
			},
			write: ({ write, reset }, newValue) => {
				if (newValue instanceof DefaultValue) {
					reset('z');
				} else {
					write('z', newValue);
				}
			},
		}),
	],
});

export default mapPositionAtom;
