import { toast } from "sonner";

export type NotificationState = "success" | "error" | "info" | "warning";

export interface OpenNotificationProps {
  state: NotificationState;
  title: string;
  description?: string;
  duration?: number;
}

/**
 * Universal notification dispatch respecting Simkash brand colors:
 * - Success: #10B981
 * - Error: #EF4444
 * - Warning: #F59E0B
 * - Info: #2563EB
 */
export const openNotification = ({
  state,
  title,
  description,
  duration = 4,
}: OpenNotificationProps) => {
  const options = {
    description,
    duration: duration * 1000,
  };

  switch (state) {
    case "success":
      toast.success(title, options);
      break;
    case "error":
      toast.error(title, options);
      break;
    case "warning":
      toast.warning(title, options);
      break;
    case "info":
    default:
      toast.info(title, options);
      break;
  }
};
