import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Dashboard from './Dashboard';
import { Home } from './Home';
import { PrivateRoute } from './Utils/PrivateRoute';
import { PublicRoute } from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import Register from './Register';
import { Profile } from './Profile';

export const App = () =>
{
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() =>
    {
        const token = getToken();
        if (!token) {
            return undefined;
        }

        axios.get(`http://localhost:3000/api/user/verify?token=${token}`).then(response =>
        {
            setUserSession(response.data.token, response.data.user);
            setAuthLoading(false);
        }).catch(error => {
            removeUserSession();
            setAuthLoading(false);
        });
    }, []);

    if (authLoading && getToken())
    {
        return <div className="content">Checking Authentication...</div>;
    }

    return(
        <div className="App">
            <BrowserRouter>
                    <div className="content">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <PublicRoute path="/register" component={Register} />
                            <PublicRoute path="/login" component={Login} />
                            <PrivateRoute path="/dashboard" component={Dashboard} />
                            <PrivateRoute path="/user/profile/:userId" component={Profile} />
                        </Switch>
                    </div>
            </BrowserRouter>
        </div>
    );
};
