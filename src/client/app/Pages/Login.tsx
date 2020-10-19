import React, { Component } from 'react';
import { withRouter, Redirect, NavLink } from 'react-router-dom';
import { setUserSession } from '../Utils/Common';
import axios from 'axios';
import { Layout } from '../Layout/Main';

type MyProps =
{
    history: any
};

type MyState =
{
    loading: boolean,
    email: string,
    password: string,
    error: string
};

class Login extends Component<MyProps, MyState>
{
    constructor(props)
    {
        super(props);
    }

    state =
    {
        loading: false,
        email: '',
        password: '',
        error: null
    };

    handleLoginButton = () =>
    {
        const { email, password } = this.state;

        this.setState({
            loading: true
        }, () => {
            axios.post('http://localhost:3000/api/user/signin', { email, password }).then(response =>
            {
                this.setState({
                    loading: false
                }, () => {
                    setUserSession(response.data.token, response.data.user);

                    this.props.history.push('/dashboard');
                });
            }).catch(error => {
                this.setState({
                    loading: false,
                    error: error.response.status === 401 ? error.response.data.message : 'Something went wrong. Please try again later.'
                });
            });
        });
    }

    handleChange = (evt) =>
    {
        const value = evt.target.value;

        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }

    render = () =>
    {
        const { email, password, error, loading } = this.state;

        return (
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
                        value={email}
                        onChange={this.handleChange.bind(this)}
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
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
                {
                    error && <><small style={{ color: 'red' }}>{error}</small><br /></>
                }
                <br />
                <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={this.handleLoginButton.bind(this)} disabled={loading} /><br />
                <p>Want to create a new account? <NavLink to="/register">Register here!</NavLink></p>
            </Layout>
        );
    }
}

export default withRouter(Login);
