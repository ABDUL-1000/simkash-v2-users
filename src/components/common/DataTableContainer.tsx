import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataTableContainerProps = {
  title: string;
  description?: string;
  toolbar?: ReactNode;
  actions?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
};
export function DataTableContainer({
  title,
  description,
  toolbar,
  actions,
  filters,
  children,
}: DataTableContainerProps) {
  return (
    <Card className="rounded-2xl border border-[#E2ECF6] bg-white shadow-xs">
      <CardHeader className="gap-4 border-b border-[#E2ECF6] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-base font-bold text-[#0F152A]">{title}</CardTitle>
            {description && (
              <p className="mt-1 text-xs font-medium text-[#8C909B]">
                {description}
              </p>
            )}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </div>
        {(toolbar || filters) && (
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">{toolbar}</div>
            <div>{filters}</div>
          </div>
        )}
      </CardHeader>
      <CardContent className="overflow-x-auto p-0">{children}</CardContent>
    </Card>
  );
}
