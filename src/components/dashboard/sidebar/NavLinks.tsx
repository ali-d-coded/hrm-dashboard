"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  path: string;
  label: string;
  icon: ReactNode;
};

export function NavLinks({ path, label, icon }: Props) {
  const pathname = usePathname();

  return (
    <Link
      className={`px-2 h-8 text-[15px] flex items-center text-gray-500 gap-2 hover:bg-gray-50 ${
        pathname === path ? "text-gray-900 bg-gray-100  rounded-md p-1" : ""
      }`}
      href={path}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );
}
