
import { z } from 'zod';
import { getPocketBaseAdminClient } from './db';
import { CreateEmployeeFormSchema } from '@/lib/definitions';
import { DynamicData } from '@/lib/contants';

export async function getAllEmployees() {
	try {
		const pb = await getPocketBaseAdminClient();
		const records = await pb.collection('employees').getFullList({
			sort: '-created',
			expand: 'department, positions'
		});

		return records.map(it => ({
			...it,
			department: it.expand?.department?.title || 'Unknown Department',
			positions: it.expand?.positions?.map((po: DynamicData) => po.title) || []
		}));
	} catch (error) {
		console.log('Error fetching employees:', error);
		return [];
	}
}

type EmployeeFormValues = z.infer<typeof CreateEmployeeFormSchema>

// Define the state type
type FormState = {
	errors?: {
		[K in keyof EmployeeFormValues]?: string[]
	}
	message?: string
}

export async function createEmployee(prevState: FormState, formData: FormData): Promise<FormState> {
	try {
		const pb = await getPocketBaseAdminClient()

		const rawFormData = Object.fromEntries(formData.entries())
		const validatedFields = CreateEmployeeFormSchema.safeParse({
			name: rawFormData.name,
			email: rawFormData.email,
			salary: parseFloat(rawFormData.salary as string),
			department: rawFormData.department,
			positions: formData.getAll('positions'),
		})

		// If any form fields are invalid, return early
		if (!validatedFields.success) {
			return {
				errors: validatedFields.error.flatten().fieldErrors,
			}
		}

		const { name, email, salary, department, positions } = validatedFields.data

		// Create the employee record in PocketBase
		const createdEmployee = await pb.collection('employees').create({
			name,
			email,
			salary,
			department,
			positions,
		})

		console.log('Created employee:', createdEmployee)

		return {
			message: `Employee ${name} created successfully!`,
		}

	} catch (error) {
		console.error('Error creating employee:', error)
		return {
			message: 'Failed to create employee. Please try again.',
		}
	}
}