"use client";

type AdminUsersTabProps = {
  onAddAdminClick: () => void;
};

export function AdminUsersTab({ onAddAdminClick }: AdminUsersTabProps) {
  return (
    <div className="space-y-6 text-xs sm:text-sm">
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#0F172A]">Admin Team</h3>
          <button
            type="button"
            onClick={onAddAdminClick}
            className="rounded-xl bg-[#2563EB] px-4 py-2 font-bold text-white text-xs shadow-xs hover:bg-[#1D4ED8]"
          >
            + Add Admin
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">NAME</th>
                <th className="p-3">ROLE</th>
                <th className="p-3">LAST ACTIVE</th>
                <th className="p-3">STATUS</th>
                <th className="p-3">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {[
                { name: "Yusuf Adam Baba", isYou: true, email: "yusuf@simkash.com", role: "Super Admin", active: "Active now", status: "Active" },
                { name: "Sarah Wilson", isYou: false, email: "sarah.w@simkash.com", role: "Finance Admin", active: "2 hours ago", status: "Active" },
                { name: "Mark Essien", isYou: false, email: "mark.e@simkash.com", role: "Operations Admin", active: "Yesterday", status: "Inactive" },
                { name: "Jessica Oh", isYou: false, email: "j.oh@simkash.com", role: "Support Admin", active: "Jan 10, 2024", status: "Active" },
                { name: "Tunde Balogun", isYou: false, email: "tunde@simkash.com", role: "Support Admin", active: "Jan 05, 2024", status: "Inactive" },
              ].map((user, idx) => (
                <tr key={idx}>
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-8 items-center justify-center rounded-full bg-[#EFF6FF] font-bold text-[#2563EB] text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <strong className="font-bold text-[#0F172A]">{user.name}</strong>
                        {user.isYou && <span className="ml-1 rounded-md bg-[#F1F5F9] px-1.5 py-0.5 text-[9px] font-bold text-[#64748B]">YOU</span>}
                        <span className="text-[10px] text-[#94A3B8] block">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className="rounded-md bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 font-bold text-[#0F172A] text-[11px]">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-3 text-[#64748B]">{user.active}</td>
                  <td className="p-3 font-bold">
                    <span className={`flex items-center gap-1.5 ${user.status === "Active" ? "text-[#059669]" : "text-[#64748B]"}`}>
                      <span className={`size-1.5 rounded-full ${user.status === "Active" ? "bg-[#059669]" : "bg-[#94A3B8]"}`} />
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-3 font-bold">
                    <button type="button" className="text-[#2563EB] hover:underline">Edit</button>
                    {!user.isYou && (
                      <button type="button" className="text-[#DC2626] hover:underline">Revoke Access</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
