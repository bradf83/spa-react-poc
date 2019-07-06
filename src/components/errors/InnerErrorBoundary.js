import React from 'react';

class InnerErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });

        // Helper to allow us to throw an error outside this boundary.
        if(error.message === "chuck it"){
            throw new Error('Error from inner error boundary');
        }
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="container">
                    <div className="alert alert-danger">
                        <p>An error occurred and was caught by the inner error boundary.</p>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }
}

export default InnerErrorBoundary;