'use server'
import { FormState, SignupFormSchema } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/sessions";
import { redirect } from 'next/navigation';
import { getPocketBaseAdminClient } from "./db";



export async function signup(state: FormState, formData: FormData) {
	const pb = await getPocketBaseAdminClient();
	// Validate form fields
	const validatedFields = SignupFormSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	})

	// If any form fields are invalid, return early
	if (!validatedFields.success) {
		console.log("valodations");

		return {
			errors: validatedFields.error.flatten().fieldErrors,
		}
	}

	console.log("success valid");

	// Cll the provider or db to create a user...
	const { email, password } = validatedFields.data
	console.log({ email, password });

	try {
		const authData = await pb.collection('users').authWithPassword(
			email,
			password,
		);
		console.log(authData.record.id);
		// console.log(pb.authStore.isValid);
		// console.log(pb.authStore.token);
		// console.log(pb.authStore.model.id);
		await createSession(authData.record.id, authData.record.role)
		// // 5. Redirect user
		console.log("redirectibg");


	} catch (error: unknown) {
		console.log({
			error,
			status: (error as { status?: number }).status || "Unknown",
		});
		return {
			message: 'Invalid username or password.',
		}
	}
	redirect("/dashboard")
}


export async function logout() {
	await deleteSession()
	redirect('/auth/login')
}

