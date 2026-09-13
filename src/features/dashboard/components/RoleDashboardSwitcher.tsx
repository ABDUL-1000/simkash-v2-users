import { Award, Building2, MapPin, Users } from "lucide-react";

export type DashboardRole = "state-coordinator" | "agency-partner" | "regional-manager" | "overview";

interface RoleDashboardSwitcherProps {
  currentRole: DashboardRole;
  onRoleChange: (role: DashboardRole) => void;
}

export function RoleDashboardSwitcher({
  currentRole,
  onRoleChange,
}: RoleDashboardSwitcherProps) {
  const roles = [
    {
      id: "state-coordinator" as DashboardRole,
      label: "State Coordinator",
      icon: <MapPin className="size-3.5" />,
      badge: "Lagos SC",
    },
    {
      id: "agency-partner" as DashboardRole,
      label: "Agency Partner",
      icon: <Users className="size-3.5" />,
      badge: "AP Network",
    },
    {
      id: "regional-manager" as DashboardRole,
      label: "Regional Manager",
      icon: <Building2 className="size-3.5" />,
      badge: "South-West",
    },
    {
      id: "overview" as DashboardRole,
      label: "User Overview",
      icon: <Award className="size-3.5" />,
    },
  ];

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[#E2ECF6] bg-white p-3 shadow-xs">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8C909B]">
          Dashboard View:
        </span>
      </div>

      <div className="flex items-center gap-1.5 max-w-full overflow-x-auto no-scrollbar whitespace-nowrap">
        {roles.map((role) => {
          const isSelected = currentRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onRoleChange(role.id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                isSelected
                  ? "bg-[#2563EB] text-white shadow-xs"
                  : "bg-[#F8FAFC] border border-[#E2ECF6] text-[#66738C] hover:bg-[#EFF4F8] hover:text-[#0F152A]"
              }`}
            >
              {role.icon}
              <span>{role.label}</span>
              {role.badge && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[9px] font-extrabold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#EFF4F8] text-[#2563EB]"
                  }`}
                >
                  {role.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
