import { useNavigate, useParams } from "react-router-dom";
import { appPaths } from "@/app/router/paths";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { RmCoordinatorDrawer } from "../Modals/dashboard/RmCoordinatorDrawer";
export function RegionalManagerCoordinatorPage() {
  const { coordinatorId, id } = useParams();
  const value = coordinatorId ?? id;
  const coordinator = Number(value);
  const navigate = useNavigate();
  if (!value || !/^\d+$/.test(value) || !Number.isSafeInteger(coordinator) || coordinator <= 0) return <AppEmptyState title="Invalid coordinator" description="Select a coordinator from your network." actionText="My state coordinators" onAction={() => navigate(appPaths.rmStateCoordinators)} />;
  return <RmCoordinatorDrawer target={{ id: coordinator, name: "State coordinator" }} onClose={() => navigate(appPaths.rmStateCoordinators)} />;
}
