'use client'

import { DynamicData, dbUrlClient } from "./contants";



class PocketBaseClient {
	private static instance: PocketBaseClient;
	private token: string | null = null;
	private tokenExpiration: Date | null = null;

	private constructor() { }

	public static getInstance(): PocketBaseClient {
		if (!PocketBaseClient.instance) {
			PocketBaseClient.instance = new PocketBaseClient();
		}
		return PocketBaseClient.instance;
	}

	public async authenticate(email: string, password: string): Promise<void> {
		try {
			const response = await fetch(`${dbUrlClient}/api/admins/auth-with-password`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ identity: email, password }),
			});

			if (!response.ok) {
				// throw new Error('Authentication failed');
				console.log("Authentication failed")
			}

			const data = await response.json();
			this.token = data.token;
			this.tokenExpiration = new Date(data.token.expires);
		} catch (error) {
			console.error('Failed to authenticate:', error);

		}
	}

	private async ensureAuthenticated(): Promise<void> {
		if (!this.token || this.isTokenExpired()) {
			throw new Error('Not authenticated or token expired');
		}
	}

	private isTokenExpired(): boolean {
		if (!this.tokenExpiration) return true;
		return new Date() >= this.tokenExpiration;
	}

	private async fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
		await this.ensureAuthenticated();

		const headers = new Headers(options.headers);
		headers.set('Authorization', this.token!);

		return fetch(`${dbUrlClient}${url}`, {
			...options,
			headers,
		});
	}

	public async get(endpoint: string): Promise<DynamicData> {
		const response = await this.fetchWithAuth(endpoint);
		return response.json();
	}

	public async post(endpoint: string, data: DynamicData): Promise<DynamicData> {
		const response = await this.fetchWithAuth(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return response.json();
	}

	public async put(endpoint: string, data: DynamicData): Promise<DynamicData> {
		const response = await this.fetchWithAuth(endpoint, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		return response.json();
	}

	public async delete(endpoint: string): Promise<void> {
		await this.fetchWithAuth(endpoint, {
			method: 'DELETE',
		});
	}
}

export const pocketBaseClient = PocketBaseClient.getInstance();