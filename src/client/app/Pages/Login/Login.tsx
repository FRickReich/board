import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { setUserSession } from '../../Utils/Common';
import axios from 'axios';
import { Layout } from '../../Layout/';

export const Login = ({ history }) =>
{
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ email, setEmail ] = useState<string>(null);
    const [ password, setPassword ] = useState<string>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>(null);

    const handleEmailChange = event => setEmail(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);

    const handleLoginButton = () =>
    {
        setLoading(true);

        axios.post('http://localhost:3000/api/user/signin', { email, password }).then(response =>
        {
            setUserSession(response.data.token, response.data.user);
            setLoading(false);

            history.push('/dashboard');
        }).catch(error => {
            setErrorMessage(error.response.status === 401 ? error.response.data.message : 'Something went wrong. Please try again later.');
            setLoading(false);
        });
    };

    return(
        <Layout>
            Login
            <br />
            <br />
            <div>
                Email
                <br />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={ email }
                    onChange={ handleEmailChange }
                />
            </div>

            <div style={{ marginTop: 10 }}>
                Password
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={ handlePasswordChange }
                />
                </div>
                {
                    errorMessage && <><small style={{ color: 'red' }}>{ errorMessage }</small><br /></>
                }
                <br />
                <input
                    type="button"
                    value={ loading ? 'Loading...' : 'Login' }
                    onClick={ handleLoginButton }
                    disabled={ loading }
                />
                <br />
                <p>Want to create a new account? <NavLink to="/register">Register here!</NavLink></p>
            </Layout>
    )
};

export default withRouter(Login);
