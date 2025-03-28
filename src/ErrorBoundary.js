import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <h1>Something went wrong.</h1>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;