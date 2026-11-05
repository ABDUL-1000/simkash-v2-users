import { useNavigate } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { RmDistributePanel } from "../components/inventory/RmDistributePanel";
import { rmFlow } from "../Modals/flow/rmFlowTokens";

/** Sidebar "Distribute SIMs": the inventory page's Distribute to SC panel on its own page, like Redistribute SIMs. */
export function RmDistributePage() {
  const navigate = useNavigate();
  return <main className="mx-auto w-full min-w-0 max-w-400 space-y-5 p-4 sm:p-6" style={{ color: rmFlow.ink }}>
    <header>
      <h1 className="text-xl font-bold">Distribute SIMs</h1>
      <p className="text-xs" style={{ color: rmFlow.muted }}>Send SIMs from your inventory to a State Coordinator</p>
    </header>
    <RmDistributePanel onViewHistory={() => navigate(`${appPaths.rmSimInventory}?tab=history`)} />
  </main>;
}
