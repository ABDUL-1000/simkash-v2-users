"use client";

export function AuditLogTab() {
  return (
    <div className="space-y-6 text-xs sm:text-sm">
      <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-[#0F172A]">Admin Audit Log</h3>
          <button type="button" className="font-bold text-[#2563EB] text-xs hover:underline">
            Export Logs
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <input
            type="text"
            placeholder="Search logs..."
            className="flex-1 min-w-[200px] rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs focus:border-[#2563EB] focus:outline-none"
          />
          <select className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs">
            <option>All Admins</option>
          </select>
          <select className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs">
            <option>All Actions</option>
          </select>
          <select className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-xs">
            <option>Date Range</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
                <th className="p-3">ADMIN</th>
                <th className="p-3">ACTION</th>
                <th className="p-3">TARGET</th>
                <th className="p-3">DETAILS</th>
                <th className="p-3">IP ADDRESS</th>
                <th className="p-3">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
              {[
                { admin: "Yusuf Adam Baba", role: "Super Admin", action: "Approved", badgeBg: "#ECFDF5", badgeColor: "#059669", target: "Payout ID #8921", details: "Manual approval for bank clearance", ip: "192.168.1.1", date: "Jan 12, 10:24 AM" },
                { admin: "Sarah Wilson", role: "Finance Admin", action: "Created", badgeBg: "#ECFDF5", badgeColor: "#059669", target: "Invoice #441", details: "Bulk invoicing for corporate client", ip: "102.33.2.14", date: "Jan 12, 09:15 AM" },
                { admin: "Sarah Wilson", role: "Finance Admin", action: "Suspended", badgeBg: "#FFFBEB", badgeColor: "#D97706", target: "Agent @mark_sim", details: "Compliance check triggered", ip: "102.33.2.14", date: "Jan 11, 04:30 PM" },
                { admin: "Admin User 2", role: "Operations", action: "Updated", badgeBg: "#EFF6FF", badgeColor: "#2563EB", target: "Pricing Rules", details: "Changed Glo 4G markup to 12%", ip: "45.12.8.9", date: "Jan 11, 02:00 PM" },
                { admin: "Yusuf Adam Baba", role: "Super Admin", action: "Deleted", badgeBg: "#FFF1F2", badgeColor: "#DC2626", target: "Test Integrations", details: "Clean up of staging environment", ip: "192.168.1.1", date: "Jan 11, 11:10 AM" },
              ].map((row, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-bold">
                    {row.admin}
                    <span className="text-[10px] text-[#94A3B8] block">{row.role}</span>
                  </td>
                  <td className="p-3">
                    <span className="rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ backgroundColor: row.badgeBg, color: row.badgeColor }}>
                      {row.action}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{row.target}</td>
                  <td className="p-3 text-[#64748B]">{row.details}</td>
                  <td className="p-3 font-mono text-[11px] text-[#94A3B8]">{row.ip}</td>
                  <td className="p-3 text-[#94A3B8]">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
