import { Component } from "react";
import ErroeMessage from "../errorMessage/errorMesage";

class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        this.setState({
            error: true
        })

    }

    render() {

        if(this.state.error) return <ErroeMessage/>

        return this.props.children;
    }
}

export default ErrorBoundary;