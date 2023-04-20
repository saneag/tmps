import React from 'react';

import { Provider } from 'react-redux';
import { store } from 'redux/store';

import { Components } from './components';
import { useRoutes } from './Routes';

import './styles/App.scss';

function App(): JSX.Element {
    const isAuthenticated = false;
    const routes = useRoutes(isAuthenticated);

    return (
        <Provider store={store}>
            <div className="App">
                {isAuthenticated && <Components.Header />}
                {routes}
            </div>
        </Provider>
    );
}

export default App;
