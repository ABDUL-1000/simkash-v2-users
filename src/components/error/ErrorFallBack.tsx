import { Button, Typography } from "antd";
import { AlertTriangle, RefreshCw } from "lucide-react";

type ErrorFallbackProps = {
  message?: string;
  errImageOrIcon?: React.ReactNode;
  action?: () => void;
};

export function ErrorFallback({
  message,
  errImageOrIcon,
  action,
}: ErrorFallbackProps) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="flex max-w-lg flex-col items-center gap-4 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-50">
          {errImageOrIcon ?? (
            <AlertTriangle
              size={50}
              className="text-red-500"
            />
          )}
        </div>

        <Typography.Title level={3}>
          {message ?? "Something went wrong"}
        </Typography.Title>

        <Typography.Text type="secondary">
          An unexpected error occurred while rendering this page.
          Please refresh the page or try again later.
        </Typography.Text>

        <div className="mt-4 flex gap-3">
          <Button
            icon={<RefreshCw size={16} />}
            type="primary"
            onClick={() => window.location.reload()}
          >
            Reload
          </Button>

          {action && (
            <Button onClick={action}>
              Go Back
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}