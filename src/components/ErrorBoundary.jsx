import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ivory px-6" role="alert">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-4xl font-heading text-charcoal mb-4">Something went wrong</h1>
            <p className="text-zinc-500 mb-8 font-body leading-relaxed">
              We encountered an unexpected error. Please refresh the page or contact us if the problem persists.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-3 bg-gold text-charcoal px-8 py-4 rounded-custom font-bold uppercase tracking-[0.2em] text-xs hover:-translate-y-0.5 transition-transform shadow-lg"
            >
              <RefreshCw size={16} />
              Refresh Page
            </button>
            <p className="mt-6 text-xs text-zinc-400">
              Need help? <a href="https://wa.me/254718592358" className="text-gold hover:underline">WhatsApp our team</a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
