import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  paths: { key: 1; label: string; path: string }[];
};
export function BreadcrumbWithCustomSeparator({ paths }: Props) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((it) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href={it.path}>{it.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
				<BreadcrumbSeparator />
				 <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
