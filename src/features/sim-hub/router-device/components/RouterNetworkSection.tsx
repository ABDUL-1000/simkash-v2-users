import { NetworkBreakdownCard, NetworkFilterTabs } from "@/components/common/NetworkOverview";
import { buildNetworkRows } from "@/constants/network";
import { useState } from "react";


export function RouterDeviceNetworkSection() {
  const [network, setNetwork] = useState("all");
  const posRows = buildNetworkRows({ mtn: 31725, airtel: 20910, glo: 14421, t2: 5048 });

  return (
    <div className="space-y-4">
      <NetworkFilterTabs value={network} onChange={setNetwork} />
      <NetworkBreakdownCard rows={posRows} />
    </div>
  );
}