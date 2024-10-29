import { getPocketBaseAdminClient } from "./db";

export async function getDepartments() {
	try {
		const pb = await getPocketBaseAdminClient();
		const records = await pb.collection('departments').getFullList({
			sort: '-created',
		});

		return records


	} catch (error) {
		console.log(error);

	}
}