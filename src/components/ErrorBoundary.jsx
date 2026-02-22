import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-6 p-8">
          <div className="card-tool p-8 max-w-md w-full text-center space-y-4">
            <AlertTriangle size={40} className="mx-auto" style={{ color: 'var(--warn-border)' }} />
            <h2 className="text-xl font-black uppercase tracking-tight text-white">
              Something went wrong
            </h2>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-3)' }}>
              {this.state.error?.message || 'Unexpected error'}
            </p>
            <button
              className="btn-tool mx-auto flex items-center gap-2"
              onClick={() => this.setState({ error: null })}
            >
              <RotateCcw size={15} /> Try again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
