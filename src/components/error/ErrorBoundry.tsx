import { Component, type ErrorInfo, type ReactNode} from "react";
import { ErrorFallback } from "./ErrorFallBack";

interface ErrorBoundaryProps {
  message?: string;
  errImageOrIcon?: ReactNode;
  children?: ReactNode;
  action?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          message={this.props.message}
          errImageOrIcon={this.props.errImageOrIcon}
          action={this.props.action}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;