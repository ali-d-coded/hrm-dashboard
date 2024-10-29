"use client";

import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SideBar from "../sidebar/SideBar";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="h-12 border-b p-3 flex items-center gap-1">
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost">
            <Icon
              icon="gg:menu"
              className="text-xl"
              style={{ color: "black" }}
            />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[240px]">
          <SideBar />
        </SheetContent>
      </Sheet>
      <section className="w-full flex justify-between ">
        <p className="capitalize font-[500] text-lg">
          {pathname.split("/")[pathname.split("/").length - 1]}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Image
                src="https://ui-avatars.com/api/?background=random"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={async () => await logout()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </div>
  );
}
