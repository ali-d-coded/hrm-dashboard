"use client";
import { DynamicData } from "@/lib/contants";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../tables/data-table";

const attendanceColumns: ColumnDef<DynamicData>[] = [
  {
    accessorKey: "employee",
    header: "Employee",
  },
  {
    accessorKey: "check_in_time",
    header: "Check in time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("check_in_time"));
      return row.getValue("check_in_time") && date.toLocaleTimeString();
    },
  },
  {
    accessorKey: "check_out_time",
    header: "Check out time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("check_out_time"));
      return row.getValue("check_out_time") && date.toLocaleTimeString();
    },
  },
  {
    accessorKey: "overtime_check_in_time",
    header: "Overtime Check in time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("overtime_check_in_time"));

      return (
        row.getValue("overtime_check_in_time") && date.toLocaleTimeString()
      );
    },
  },
  {
    accessorKey: "overtime_check_out_time",
    header: "Overtime Check out time",
    cell: ({ row }) => {
      const date = new Date(row.getValue("overtime_check_out_time"));
      return (
        row.getValue("overtime_check_out_time") && date.toLocaleTimeString()
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return row.getValue("date") && date.toLocaleDateString();
    },
  },
  {
    accessorKey: "hours_worked",
    header: "Hours Worked",
  },
  {
    accessorKey: "half_day_cut",
    header: "Half day cut",
  },
];

type Props = {
  attendanceData: DynamicData[];
};

export default function AttendanceTable({ attendanceData = [] }: Props) {
  const filterableColumns = [
    { id: "employee", title: "Employee", type: "text" as const },
    { id: "date", title: "Date", type: "date" as const },
  ];

  return (
    <div>
      <DataTable
        data={attendanceData}
        columns={attendanceColumns}
        filterableColumns={filterableColumns}
      />
    </div>
  );
}
