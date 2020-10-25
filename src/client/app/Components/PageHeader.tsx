import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { getToken, getUser, removeUserSession } from '../Utils/Common';

const PageHeader = ({ history, title }) =>
{
    const token = getToken() ? true : false;
    const user = getUser();

    const handleLogout = () =>
    {
        removeUserSession();
        history.push('/login');
    };

    return(
        <div>
            <ul className="header">
                <li><NavLink exact activeClassName="active" to="/">{title}</NavLink></li>
                <li><NavLink exact activeClassName="active" to="/board">Board</NavLink></li>
                {
                    token ?
                    (
                        <>
                            <li><NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink></li>
                            <li><NavLink to="/login" onClick={() => handleLogout()}>Logout</NavLink></li>
                            {
                                user &&
                                <li><NavLink to={`/user/profile/${user.profile.userName}`}>{ user.profile.userName }</NavLink></li>
                            }
                        </>
                    ) : (
                        <>
                        <li><NavLink activeClassName="active" to="/register" >Register</NavLink></li>
                        <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
                        </>
                    )
                }
            </ul>
        </div>
    );
};

export default withRouter(PageHeader);
