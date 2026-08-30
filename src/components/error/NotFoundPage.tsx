import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { appPaths } from "@/app/router/paths";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-6 text-center">
      <div>
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-4xl font-bold">Page not found</h1>
        <p className="mt-3 text-muted-foreground">
          The page you requested does not exist.
        </p>
        <Button className="mt-6" render={<Link to={appPaths.dashboard} />}>
          Return to dashboard
        </Button>
      </div>
    </main>
  );
}
