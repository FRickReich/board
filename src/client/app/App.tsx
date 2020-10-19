import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Pages/Login';
import Dashboard from './Dashboard/Dashboard';
import { Home } from './Pages/Home';
import { PrivateRoute } from './Utils/PrivateRoute';
import { PublicRoute } from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import Register from './Pages/Register';
import { Profile } from './Profile/Profile';
import { BoardIndex } from './Board/BoardIndex';

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
                            <Route exact path="/board" component={BoardIndex} />
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
