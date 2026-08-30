import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardQuickActions } from "../dashboard.data";

type QuickActionsProps = {
  onAction: (key: string) => void;
};

export function QuickActions({ onAction }: QuickActionsProps) {
  return (
    <Card className="h-full rounded-2xl border-[#E2ECF8] bg-white shadow-none">
      <CardHeader className="px-5 pb-3 pt-5 sm:px-6">
        <CardTitle className="text-sm font-bold text-[#0F1F36]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3 px-5 pb-5 sm:grid-cols-4 sm:px-6">
        {dashboardQuickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.key}
              type="button"
              onClick={() => onAction(action.key)}
              className="group flex min-h-28 flex-col items-center justify-center gap-3 rounded-xl border border-[#E2ECF8] bg-white px-2 py-3 text-center transition-all hover:-translate-y-0.5 hover:border-[#C7DAFC] hover:shadow-sm"
            >
              <span
                className="grid size-11 place-items-center rounded-xl transition-transform group-hover:scale-105"
                style={{ backgroundColor: action.iconBackgroundColor, color: action.iconColor }}
              >
                <Icon className="size-4" />
              </span>
              <span className="max-w-24 text-xs font-bold leading-4 text-[#0F1F36]">{action.label}</span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}