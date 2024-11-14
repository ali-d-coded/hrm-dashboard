import { ADMIN_EMAIL, ADMIN_PASSWORD, dbUrl } from '@/lib/contants';
import PocketBase from 'pocketbase';

class PocketBaseAdminClient {
	private static instance: PocketBaseAdminClient;
	private pb: PocketBase;
	private isAuthenticated: boolean = false;
	private authData: string | null = null;
	private tokenExpiry: number | null = null;

	private constructor() {
		this.pb = new PocketBase(dbUrl);
	}

	public static getInstance(): PocketBaseAdminClient {
		if (!PocketBaseAdminClient.instance) {
			PocketBaseAdminClient.instance = new PocketBaseAdminClient();
		}
		return PocketBaseAdminClient.instance;
	}

	public async authenticate(): Promise<void> {
		if (!this.isAuthenticated || this.isTokenExpired()) {
			console.log({ ADMIN_EMAIL, ADMIN_PASSWORD });

			try {
				const authData = await this.pb.admins.authWithPassword(
					ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL as string,
					ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string
				);
				this.authData = authData.token;
				this.isAuthenticated = true;

				// Set token expiry time (14 days from now)
				this.tokenExpiry = Date.now() + 14 * 24 * 60 * 60 * 1000;
			} catch (error) {
				console.error('Failed to authenticate admin:', error);
				throw error;
			}
		}
	}

	private isTokenExpired(): boolean {
		if (!this.authData || !this.tokenExpiry) return true;
		const currentTime = Date.now();
		return currentTime >= this.tokenExpiry;
	}

	public getClient(): PocketBase {
		return this.pb;
	}
}

export async function getPocketBaseAdminClient(): Promise<PocketBase> {
	const client = PocketBaseAdminClient.getInstance();
	await client.authenticate();
	return client.getClient();
}
