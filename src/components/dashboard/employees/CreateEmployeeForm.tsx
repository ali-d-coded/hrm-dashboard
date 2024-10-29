// "use client";

// import React, { Dispatch, SetStateAction } from "react";
// import { z } from "zod";
// import { CustomForm } from "../forms/form";
// import { pocketBaseClient } from "@/lib/PocketBaseClient";

// export const employeeSchema = z.object({
//   name: z.string().min(2, {
//     message: "Name must be at least 2 characters.",
//   }),
//   email: z.string().email({ message: "Invalid email address" }),
//   salary_per_month: z
//     .number()
//     .min(0, { message: "Salary must be a positive number." }),
//   department: z.string(),
//   positions: z.array(z.string()).min(1, {
//     message: "Select at least one position.",
//   }),
// });

// export type EmployeeFormValues = z.infer<typeof employeeSchema>;

// type Props = {
//   // close: Dispatch<SetStateAction<boolean>>;
//   departments: { label: string; value: string }[]; // Passed from parent
//   positions: { label: string; value: string }[]; // Passed from parent
//   className: string;
// };

// export default function CreateEmployeeForm({
//   // close,
//   departments,
//   positions,
//   className,
// }: Props) {
//   const fields = [
//     {
//       name: "name" as const,
//       label: "Name",
//       type: "text" as const,
//       placeholder: "Enter employee name",
//       description: "The employee's full name.",
//     },
//     {
//       name: "email" as const,
//       label: "Email",
//       type: "email" as const,
//       placeholder: "Enter employee email",
//       description: "We'll use this email for communication.",
//     },
//     {
//       name: "salary_per_month" as const,
//       label: "Salary",
//       type: "number" as const,
//       placeholder: "Enter employee salary",
//       description: "Monthly salary in INR.",
//     },
//     {
//       name: "department" as const,
//       label: "Department",
//       type: "select" as const,
//       options: departments, // Passed from parent
//       description: "Select the employee's department.",
//     },
//     {
//       name: "positions" as const,
//       label: "Positions",
//       type: "multiselect" as const,
//       options: positions, // Passed from parent
//       description: "Select one or more positions for the employee.",
//     },
//   ];

//   async function handleProfileSubmit(values: EmployeeFormValues) {
//     console.log("Profile Form Values: ", values);
//     await pocketBaseClient.authenticate("ashcorp.hr@gmail.com", "Hr.ash@corp1");

//     const data = {
//       email: values.email,
//       emailVisibility: true,
//       password: "12345678",
//       passwordConfirm: "12345678",
//       name: values.name,
//       role: "employee",
//     };

//     const user = await pocketBaseClient.post(
//       "/api/collections/users/records",
//       data
//     );

//     const empl = await pocketBaseClient.post(
//       "/api/collections/employees/records",
//       {
//         ...values,
//         user: user.id,
//       }
//     );
//     // console.log({ user });

//     // close(false);
//   }

//   const defaultValues: EmployeeFormValues = {
//     name: "",
//     email: "",
//     salary_per_month: 0,
//     department: "",
//     positions: [],
//   };

//   return (
//     <div className={...className}>
//       <CustomForm
//         schema={employeeSchema}
//         fields={fields}
//         defaultValues={defaultValues}
//         onSubmit={handleProfileSubmit}
//       />
//     </div>
//   );
// }
import React from "react";

export default function CreateEmployeeForm() {
  return <div>CreateEmployeeForm</div>;
}
