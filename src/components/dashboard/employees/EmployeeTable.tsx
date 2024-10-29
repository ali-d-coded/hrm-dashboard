"use client";
import { Badge } from "@/components/ui/badge";
import { DynamicData } from "@/lib/contants";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../tables/data-table";

const employeeColumns: ColumnDef<DynamicData>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      return <Badge variant="outline">{row.getValue("department")}</Badge>;
    },
  },
  {
    accessorKey: "positions",
    header: "Positions",
    cell: ({ row }) => {
      const positions = row.getValue<string[]>("positions");
      return positions.map((it, i) => (
        <Badge key={i} variant="outline">
          {it}
        </Badge>
      ));
    },
  },
  // {
  //   accessorKey: "salary_per_month",
  //   header: "Salary",
  //   cell: ({ row }) => {
  //     const salary = row.getValue<number>("salary_per_month");
  //     return new Intl.NumberFormat("en-IN", {
  //       style: "currency",
  //       currency: "INR",
  //     }).format(salary);
  //   },
  // },
];

type Props = {
  employeesData: DynamicData[];
};

export default function EmployeeTable({ employeesData = [] }: Props) {
  // const router = useRouter();

  // const handleEdit = (user: any) => {
  //   toast({
  //     title: "Edit User",
  //     description: `Editing user: ${user.name}`,
  //   });
  // };

  // const handleDelete = (user: any) => {
  //   toast({
  //     title: "Delete User",
  //     description: `Deleting user: ${user.name}`,
  //     variant: "destructive",
  //   });
  // };
  const filterableColumns = [
    { id: "name", title: "Employee", type: "text" as const },
    // { id: "date", title: "Date", type: "date" as const },
  ];
  return (
    <div>
      <DataTable
        data={employeesData}
        columns={employeeColumns}
        filterableColumns={filterableColumns}
        // onAdd={() => router.push("/dashboard/employees/create")}
        // onEdit={handleEdit}
        // onDelete={handleDelete}
      />
    </div>
  );
}
