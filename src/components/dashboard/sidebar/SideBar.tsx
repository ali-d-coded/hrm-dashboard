import React from "react";
import { Icon } from "@iconify/react";
import { NavLinks } from "./NavLinks";
const navitems = [
  {
    key: 1,
    label: "Home",
    path: "/dashboard",
    icon: <Icon icon="ion:home" />,
  },
  {
    key: 2,
    label: "Employees",
    path: "/dashboard/employees",
    icon: <Icon icon="flowbite:users-group-solid" />,
  },
  {
    key: 3,
    label: "Attendance",
    path: "/dashboard/attendance",
    icon: <Icon icon="healthicons:i-schedule-school-date-time" />,
  },
  {
    key: 4,
    label: "Payroll",
    path: "/dashboard/payroll",
    icon: <Icon icon="mdi:recurring-payment" />,
  },
];

export default function SideBar() {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="p-3">
        <div className="h-12 flex items-center">
          <p>ASH HRM</p>
        </div>
        <nav className="flex flex-col gap-2 ">
          {navitems.map((it) => (
            <NavLinks {...it} key={it.key} />
          ))}
        </nav>
      </div>
      <div className="h-12 border-t p-3">bottom</div>
    </div>
  );
}
