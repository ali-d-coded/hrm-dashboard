export type EmployeesType = {
	id: string;
	name: string;
	email: string;
	department: string;
	positions: string[];
	salary_per_month: number;
};

export type AttendanceType = {
	id: string;
	employee: string;
	check_in_time: string;
	check_out_time: string;
	date: string
	hours_worked: number
	half_day_cut: boolean
};

