import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { getToken, removeUserSession } from './Utils/Common';

const PageHeader = ({ history }) =>
{
    const token = getToken() ? true : false;

    const handleLogout = () =>
    {
        removeUserSession();
        history.push('/login');
    };

    return(
        <div>

            <ul className="header">
                <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
                {
                    token ?
                    (
                        <>
                            <li><NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink></li>
                            <li><NavLink to="/login" onClick={() => handleLogout()}>Logout</NavLink></li>
                        </>
                    ) : (
                        <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
                    )
                }
            </ul>
        </div>
    );
};

export default withRouter(PageHeader);
