import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Dashboard/Dashboard';
import { Home } from './Pages/Home';
import { PrivateRoute } from './Utils/PrivateRoute';
import { PublicRoute } from './Utils/PublicRoute';
import Register from './Pages/Register';
import { Profile } from './Profile/Profile';
import { BoardIndex } from './Board/BoardIndex';
import { SubCategoryView } from './Board/SubCategoryView';
import { NotFound } from './Pages/NotFound';
import { ThreadView } from './Board/ThreadView';

export const Routes =  () =>
{
    return(
        <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/board" component={BoardIndex} />
            <Route exact path="/board/:slug" component={SubCategoryView} />
            <Route exact path="/board/:subCategorySlug/:slug" component={ThreadView} />

            <PublicRoute path="/register" component={Register} />

            <PublicRoute path="/login" component={Login} />

            <PrivateRoute path="/dashboard" component={Dashboard} />

            <Route path="/user/profile/:userId" component={Profile} />

            <Route exact component={NotFound} />
        </Switch>
    );
};
