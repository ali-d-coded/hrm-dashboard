import PocketBase from 'pocketbase';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'ashcorp.hr@gmail.com';
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Hr.ash@corp1';
const DB_URL = process.env.NEXT_PUBLIC_DB_URL || 'https://ash-hrm-pocketbase.appii.space';

class PocketBaseAdminClient {
	private static instance: PocketBaseAdminClient;
	private pb: PocketBase;
	private isAuthenticated: boolean = false;
	private authData: string | null = null;
	private tokenExpiry: number | null = null;

	private constructor() {
		this.pb = new PocketBase(DB_URL);
	}

	public static getInstance(): PocketBaseAdminClient {
		if (!PocketBaseAdminClient.instance) {
			PocketBaseAdminClient.instance = new PocketBaseAdminClient();
		}
		return PocketBaseAdminClient.instance;
	}

	public async authenticate(retryCount = 3): Promise<void> {
		if (!this.isAuthenticated || this.isTokenExpired()) {
			console.log({ ADMIN_EMAIL, ADMIN_PASSWORD });

			while (retryCount > 0) {
				try {
					const authData = await this.pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
					this.authData = authData.token;
					this.isAuthenticated = true;
					this.tokenExpiry = Date.now() + 14 * 24 * 60 * 60 * 1000; // Token expiry set to 14 days

					return; // Exit on success
				} catch (error) {
					console.error('Failed to authenticate admin:', error);
					retryCount -= 1;
					if (retryCount === 0) {
						throw new Error('Authentication failed after multiple attempts');
					}
					await new Promise(res => setTimeout(res, 1000)); // Optional: Add delay before retry
				}
			}
		}
	}

	private isTokenExpired(): boolean {
		if (!this.authData || !this.tokenExpiry) return true;
		return Date.now() >= this.tokenExpiry;
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
