"use client";

export function ApplianceInputTable() {
  const appliances = [
    { name: "LED Bulb", qty: "× 8", watts: "10W", hours: "8h", load: "640 Wh" },
    { name: "Ceiling Fan", qty: "× 3", watts: "75W", hours: "10h", load: "2,250 Wh" },
    { name: "32\" TV", qty: "× 1", watts: "80W", hours: "6h", load: "480 Wh" },
    { name: "Fridge 200L", qty: "× 1", watts: "150W", hours: "24h", load: "3,600 Wh" },
    { name: "CCTV Camera", qty: "× 4", watts: "15W", hours: "24h", load: "1,440 Wh" },
    { name: "DVR/NVR", qty: "× 1", watts: "25W", hours: "24h", load: "600 Wh" },
    { name: "Laptop", qty: "× 2", watts: "65W", hours: "8h", load: "1,040 Wh" },
    { name: "Phone Charger", qty: "× 4", watts: "10W", hours: "4h", load: "160 Wh" },
  ];

  return (
    <div className="rounded-2xl border border-[#E2ECF8] bg-white p-5 shadow-sm space-y-4 text-xs sm:text-sm">
      <h3 className="text-sm font-bold text-[#0F172A]">Appliance Input</h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-bold text-[#64748B]">
              <th className="p-2.5">APPLIANCE</th>
              <th className="p-2.5">QTY</th>
              <th className="p-2.5">WATTS</th>
              <th className="p-2.5">HOURS/DAY</th>
              <th className="p-2.5">DAILY LOAD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0] font-medium text-[#0F172A]">
            {appliances.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#F8FAFC]">
                <td className="p-2.5 font-bold">{row.name}</td>
                <td className="p-2.5 text-[#64748B] font-mono">{row.qty}</td>
                <td className="p-2.5 text-[#64748B]">{row.watts}</td>
                <td className="p-2.5 text-[#64748B]">{row.hours}</td>
                <td className="p-2.5 font-mono font-bold text-[#0F172A]">{row.load}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9] font-bold">
        <span className="text-[#0F172A]">Total Daily Load</span>
        <strong className="text-sm text-[#0F172A] font-mono">10,210 Wh</strong>
      </div>
    </div>
  );
}
