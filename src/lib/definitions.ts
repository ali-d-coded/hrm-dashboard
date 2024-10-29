import { z } from 'zod'

export const SignupFormSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
	password: z
		.string()
		.min(8, { message: 'Be at least 8 characters long' })
		.regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
		.regex(/[0-9]/, { message: 'Contain at least one number.' })
		.regex(/[^a-zA-Z0-9]/, {
			message: 'Contain at least one special character.',
		})
		.trim(),
})

export const CreateEmployeeFormSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	salary: z.number().positive('Salary must be a positive number'),
	department: z.string().min(1, 'Department is required'),
	positions: z.array(z.string()).min(1, 'At least one position is required'),
})

export type FormState =
	| {
		errors?: {
			email?: string[]
			password?: string[]
		}
		message?: string
	}
	| undefined


export type SessionPayload = {
	userId: string
	role: string
	expiresAt: Date
}