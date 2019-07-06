import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="container mt-3">
                    <div className="alert alert-danger">
                        <p>An error has occurred that breached the inner error boundary.</p>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;