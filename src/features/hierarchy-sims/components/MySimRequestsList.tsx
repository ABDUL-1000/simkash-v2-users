import { Link } from "react-router-dom";
import { AppEmptyState } from "@/components/common/AppEmptyState";
import { appPaths } from "@/app/router/paths";
import { openNotification } from "@/utils/notifications";
import { useCancelSimRequest, useMySimRequests } from "../api";
import { useHierarchyConfig } from "../roles";
import { SimRequestCard } from "./SimRequestCard";

/** The latest requests you've sent up the chain, for embedding in inventory pages. */
export function MySimRequestsList({ limit = 4 }: { limit?: number }) {
  const config = useHierarchyConfig();
  const query = useMySimRequests({ status: "all", page: 1, limit });
  const cancel = useCancelSimRequest();
  const requests = query.data?.requests ?? [];
  const total = query.data?.pagination.total ?? requests.length;

  if (query.isLoading) return <div className="grid gap-3 md:grid-cols-2">{[0, 1].map((i) => <div key={i} className="h-36 animate-pulse rounded-2xl bg-slate-100" />)}</div>;
  if (query.error) return <AppEmptyState title="Couldn't load your requests" description={query.error.message} actionText="Retry" onAction={() => void query.refetch()} />;
  if (!requests.length) return <AppEmptyState title="No stock requests" description={`Requests you send to ${config?.supplierLabel ?? "your supplier"} will appear here.`} />;

  return <div className="space-y-3">
    <div className="grid gap-3 md:grid-cols-2">
      {requests.map((r) => <SimRequestCard key={r.id} request={r} direction="mine" cancelling={cancel.isPending && cancel.variables === r.id}
        onCancel={(req) => cancel.mutateAsync(req.id, {
          onSuccess: () => openNotification({ state: "success", title: "Request cancelled" }),
          onError: (err) => openNotification({ state: "error", title: "Couldn't cancel", description: err.message }),
        })} />)}
    </div>
    <Link to={`${appPaths.simRequests}?tab=mine`} className="block text-center text-xs font-bold text-[#2563EB] hover:underline">
      {total > requests.length ? `View all ${total} requests →` : "Manage SIM requests →"}
    </Link>
  </div>;
}
