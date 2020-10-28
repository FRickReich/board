import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Layout } from '../../Layout/';

export const Register = () =>
{
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ success, setSuccess ] = useState<boolean>(false);
    const [ email, setEmail ] = useState<string>(null);
    const [ password, setPassword ] = useState<string>(null);
    const [ passwordValidation, setPasswordValidation ] = useState<string>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>(null);

    const handleEmailChange = event => setEmail(event.target.value);
    const handlePasswordChange = event => setPassword(event.target.value);
    const handlePasswordValidationChange = event => setPasswordValidation(event.target.value);

    const handleRegisterButton = () =>
    {
        setLoading(true);

        if (password === '' || password === passwordValidation)
        {
            axios.post('http://localhost:3000/api/user/register', { email, password }).then(() =>
            {
                setSuccess(true);
                setEmail(null)
                setPassword(null);
                setPasswordValidation(null);
                setLoading(false);
            }).catch(error => {
                setErrorMessage(error.response.status === 401 ? error.response.data.message : 'Something went wrong. Please try again later.');
                setLoading(false);
            });
        }
        else
        {
            setErrorMessage('Passwords did not match!');
            setLoading(false);
        }
    };

    return(
        <Layout>
            Register
            <br />
            <br />
            <div>
                Email
                <br />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
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
                    onChange={handlePasswordChange}
                />
            </div>
            <div style={{ marginTop: 10 }}>
                Repeat Password
                <br />
                <input
                    type="password"
                    placeholder="Repeat Password"
                    name="passwordValidation"
                    value={passwordValidation}
                    onChange={handlePasswordValidationChange}
                />
            </div>
            {
                errorMessage && <><small style={{ color: 'red' }}>{errorMessage}</small><br /></>
            }
            {
                success && <><small style={{ color: 'green' }}>
                    Registration Successful.
                    <NavLink exact to="/">
                        Back to Homepage
                    </NavLink>
                </small><br /></>
            }
            <br />
            <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleRegisterButton} disabled={loading} /><br />
            <p>Already have an account? <NavLink to="/login">Login here!</NavLink></p>
        </Layout>
    );
};

export default Register;
