import { getAllEmployees } from "@/actions/employees";
import EmployeeTable from "@/components/dashboard/employees/EmployeeTable";
import { DynamicData } from "@/lib/contants";

export default async function Employees() {
  const employees: DynamicData[] = (await getAllEmployees()) || [];
  // await updateQr("n1glcg52b6gk1gi")

  return (
    <div className="p-5">
      <EmployeeTable employeesData={employees} />
    </div>
  );
}
