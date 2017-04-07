import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from '../routes';

const Root = (props) => {
    const { store, history } = props;
    return (
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    );
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default Root;
