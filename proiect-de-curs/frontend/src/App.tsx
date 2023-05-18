import React from 'react';

import { useAppDispatch, useAppSelector } from './redux/store';

import { Components } from './components';
import { useRoutes } from './Routes';

import './styles/App.scss';
import { getUser } from './redux/slices/userSlice';

function App(): JSX.Element {
    const dispatch = useAppDispatch();
    const status = useAppSelector((state) => state.userReducer.userStatus);
    const [isLoading, setIsLoading] = React.useState(true);

    const isAuthenticated = useAppSelector(
        (state) => state.userReducer.isAuthenticated
    );

    React.useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    React.useEffect(() => {
        if (isAuthenticated) setIsLoading(false);
    }, [isAuthenticated]);

    const routes = useRoutes(isAuthenticated);

    if (status >= 500) {
        return <Components.Loading isServerError={true} />;
    }

    if ((status <= 400 || status >= 500) && isLoading)
        return <Components.Loading isServerError={false} />;

    return (
        <div className="App">
            {isAuthenticated && <Components.Header />}
            {routes}
        </div>
    );
}

export default App;
