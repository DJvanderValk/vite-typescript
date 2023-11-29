import * as path from 'path';

import axios, { AxiosInstance } from 'axios';

interface BoredResponse {
	activity: string
}

const url = 'https://www.boredapi.com/api';

class BoredService {
	axiosInstance: AxiosInstance;

	/**
	 * Construct a service to get user information
	 */
	constructor() {
		this.axiosInstance = axios.create({
			baseURL: 'https://www.boredapi.com/api'
		});
	}

	/**
	 * Authenticate the user
	 * @returns
	 */
	async getActivity(): Promise<BoredResponse> {
		let data = { activity: 'init'};
		try {
			const res = await axios.get<BoredResponse>(
				`${url}/activity`
			);
			// const res = await this.axiosInstance.get<BoredResponse>(
			// 	'activity'
			// );
			data = res.data;
		} catch (error) {
			console.log(error);
			return { activity: 'catch' };
		}

		return data;
	}
}

export default BoredService;
