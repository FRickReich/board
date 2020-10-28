import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import {
    Home,
    Dashboard,
    Login,
    Profile,
    Register,
    BoardIndex,
    NotFound,
    ThreadIndex,
    SubCategoryIndex,
    Settings
} from './../Pages/';

export const Routes =  () =>
{
    return(
        <Switch>
            {/* Home Route */}
            <Route exact path="/" component={Home} />

            {/* Board Routes */}
            <Route exact path="/board" component={BoardIndex} />
            <Route exact path="/board/:slug" component={SubCategoryIndex} />
            <Route exact path="/board/:subCategorySlug/:slug" component={ThreadIndex} />

            {/* User Routes */}
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/settings" component={Settings} />

            {/* Other Routes */}
            <Route path="/user/:userId" component={Profile} />

            {/* Not Found Route */}
            <Route exact component={NotFound} />
        </Switch>
    );
};
