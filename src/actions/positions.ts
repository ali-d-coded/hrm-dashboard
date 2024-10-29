import { getPocketBaseAdminClient } from "./db";

export async function getPositions() {
	try {
		const pb = await getPocketBaseAdminClient();
		const records = await pb.collection('positions').getFullList({
			sort: '-created',
		});

		return records


	} catch (error) {
		console.log(error);

	}
}