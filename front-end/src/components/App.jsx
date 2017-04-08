import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

/*
 This is a class-based component because the current
 version of hot reloading won't hot reload a stateless
 component at the top-level.
 */
class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    render() {
        return (
            <div>
                <IndexLink to="/">Home</IndexLink>
                {' | '}
                <Link to="/fuel-savings">Demo App</Link>
                {' | '}
                <Link to="/about">About</Link>
                <br />
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.element,
};

App.defaultProps = {
    children: PropTypes.element,
};
export default App;
