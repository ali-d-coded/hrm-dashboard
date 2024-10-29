import { getPocketBaseAdminClient } from "./db";

export async function getAttendances() {
	try {
		const pb = await getPocketBaseAdminClient();
		const records = await pb.collection('attendance').getFullList({
			expand: "employee"
		});
		// console.log({ records: records[0].expand.employee.name });

		return records.map(it => {
			const { expand, ...rest } = it
			return {
				...rest,
				employee: expand?.employee.name
			}
		})

	} catch (error) {
		console.log({ error });

	}
}