import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_: Error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  override render() { 
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="mt-20 flex flex-col items-center justify-center bg-slate-500">
          <h1 className='font-bold text-4xl text-red-700 capitalize'>Something went wrong.</h1>
          <p className='font-semi text-xl text-gray-700'>Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;