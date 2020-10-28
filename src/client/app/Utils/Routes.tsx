import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Dashboard from '../Pages/Dashboard/Dashboard';
import { Home } from '../Pages/Home/Home';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import Register from '../Pages/Register/Register';
import { Profile } from '../Pages/Profile/Profile';
import { BoardIndex } from '../Pages/Board/BoardIndex';
import { SubCategoryView } from '../Pages/Board/SubCategoryIndex';
import { NotFound } from '../Pages/NotFound/NotFound';
import { ThreadView } from '../Pages/Board/ThreadIndex';

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
