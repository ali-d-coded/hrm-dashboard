/**
 * TODO
 * 1. generate qr code for every employee
 * 2. on scan the qr code the attendance is registered as check in
 * 3. on scan the qr once again that day will register it as check out
 * 4. each scan will reset the qr code
 */

import { generateHash } from "@/lib/utils";
import { getPocketBaseAdminClient } from "./db";


export async function updateQr(emplId: string) {
	const pb = await getPocketBaseAdminClient();
	console.log({ emplId });

	try {

		const employee = await pb.collection('employees').getOne(emplId);
		console.log({ employee });

		// Corrected the query filter by removing the extra closing brace
		// const employeeQr = await pb.collection('qr_code').getFirstListItem(`employee=${employee}`);
		// console.log({ employeeQr });

		const data: { employee?: string; qr_code_text: string } = {
			employee: emplId,
			qr_code_text: generateHash(20),
		};

		// if (!employeeQr) {
		// 	// Create a new record if it does not exist
		// 	await pb.collection('qr_code').create(data);
		// } else {
		console.log("Updating QR Code...");

		// Optionally remove the employee field if you don't want to update it
		// delete data.employee;

		// Update the existing QR code entry
		await pb.collection('qr_code').update("tvqa6opu0j0edbw", data);
		// }

	} catch (error) {
		// Log the error for debugging
		console.error("Error while updating QR code:", error);
	}
}



export async function getQrCodes() {
	try {
		const pb = await getPocketBaseAdminClient()
		const qrs = await pb.collection("qr_code").getFullList()

		return qrs
	} catch (error) {
		console.error("Error while getting QR codes:", error);

	}
}