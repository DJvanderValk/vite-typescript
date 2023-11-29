import { number, object } from '@recoiljs/refine';
import { DefaultValue, atom } from 'recoil';
import { urlSyncEffect } from 'recoil-sync';

const mapPositionAtom = atom<{ lat: number; lng: number }>({
	key: 'mapPositionAtom',
	default: { lat: 52.092, lng: 5.104 },
	effects: [
		urlSyncEffect({
			refine: object({
				lat: number(),
				lng: number(),
			}),
			read: ({ read }) => {
				const value = { lat: read('lat'), lng: read('lng') };
				if (
					value.lat instanceof DefaultValue ||
					value.lng instanceof DefaultValue
				) {
					return new DefaultValue();
				}
				return value;
			},
			write: ({ write, reset }, newValue) => {
				if (newValue instanceof DefaultValue) {
					reset('lat');
					reset('lng');
				} else {
					write('lat', parseFloat(newValue.lat.toFixed(5)));
					write('lng', parseFloat(newValue.lng.toFixed(5)));
				}
			},
		}),
	],
});

export default mapPositionAtom;
