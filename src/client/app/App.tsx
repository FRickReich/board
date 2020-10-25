import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import { Routes } from './Routes';

import './App.scss';

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
                        <Routes />
                    </div>
            </BrowserRouter>
        </div>
    );
};
