import * as path from 'path';

import axios, { AxiosInstance } from 'axios';

import { apiPrefixes } from '~constants';

const tokenKeys = {
	ATOKEN_EXP: 'atoken_exp',
	USER_ROLE: 'user_role',
	USERNAME: 'username',
};

type TokenResponse = {
	accesToken: string;
	refreshToken: string;
	idToken: string;
};

class UserService {
	axiosInstance: AxiosInstance;

	/**
	 * Construct a service to get user information
	 */
	constructor() {
		this.axiosInstance = axios.create({
			baseURL: import.meta.env.VITE_USER_SERVICE_URL,
		});
	}

	/**
	 * Authenticate the user
	 * @param username The username used for login
	 * @param password The password used for login
	 * @returns
	 */
	async authenticate(username: string, password: string): Promise<boolean> {
		try {
			const { data } = await this.axiosInstance.post<TokenResponse>(
				apiPrefixes.LOGIN,
				{
					username: username,
					password: password,
				},
				{
					withCredentials: true,
				},
			);
			this.saveIdToken(data.idToken);
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 * Refresh the tokens saved as cookies
	 * @returns
	 */
	async refreshToken(): Promise<boolean> {
		const username = sessionStorage.getItem(tokenKeys.USERNAME);
		try {
			const { data } = await this.axiosInstance.post<TokenResponse>(
				apiPrefixes.REFRESH,
				{
					username: username,
				},
				{
					withCredentials: true,
				},
			);
			this.saveIdToken(data.idToken);
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 *
	 * @param username
	 * @param password
	 * @param firstName
	 * @param lastName
	 * @returns
	 */
	async register(
		username: string,
		password: string,
		firstName: string,
		lastName: string,
	) {
		try {
			const { data } = await this.axiosInstance.post(apiPrefixes.REGISTER, {
				username: username,
				password: password,
				firstName: firstName,
				lastName: lastName,
			});
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	/**
	 *
	 * @param verificationCode
	 * @returns
	 */
	async verifyRegistration(verificationCode: string) {
		try {
			const { data } = await this.axiosInstance.post(
				path.join(apiPrefixes.VERIFICATION, verificationCode),
			);
		} catch (error) {
			console.log(error);
			return false;
		}

		return true;
	}

	saveIdToken(token: string) {
		const tokenElements = token.split('.');
		const payload = JSON.parse(atob(tokenElements[1]));

		sessionStorage.setItem(tokenKeys.ATOKEN_EXP, payload.exp);
		sessionStorage.setItem(tokenKeys.USER_ROLE, payload.role);
		sessionStorage.setItem(tokenKeys.USERNAME, payload.user);
	}

	signOut() {
		sessionStorage.removeItem(tokenKeys.ATOKEN_EXP);
		sessionStorage.removeItem(tokenKeys.USER_ROLE);
		sessionStorage.removeItem(tokenKeys.USERNAME);
	}

	checkTokenValidity(): boolean {
		return true;
		
		const expiration = sessionStorage.getItem(tokenKeys.ATOKEN_EXP);
		const valid = Number(expiration) * 1000 > Date.now();
		return valid;
	}
}

export default UserService;
