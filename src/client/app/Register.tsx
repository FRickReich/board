import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { Layout } from './Layout';
import { response } from 'express';

type MyProps =
{
    history: any
};

type MyState =
{
    error: string,
    success: boolean,
    loading: boolean,
    email: string,
    password: string,
    passwordValidation: string
};

export default class Register extends Component<MyProps, MyState>
{
    constructor(props)
    {
        super(props);
    }

    state = {
        error: null,
        success: false,
        loading: false,
        email: '',
        password: '',
        passwordValidation: ''
    };

    handleChange = (evt) =>
    {
        const value = evt.target.value;

        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }

    handleRegisterButton = () =>
    {
        const { email, password, passwordValidation } = this.state;

        if (password === '' || password === passwordValidation) {
            this.setState({
                loading: true
            }, () => {
                axios.post('http://localhost:3000/api/user/register', { email, password }).then(response =>
                {
                    this.setState({
                        success: true,
                        email: '',
                        password: ''
                    });
                }).catch(error => {
                    this.setState({
                        error
                    });
                });
            });
        } else {
            this.setState({
                error: 'Passwords did not match!'
            });
        }
    }

    render = () =>
    {
        const { error, success, email, password, passwordValidation, loading } = this.state;

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

                <div style={{ marginTop: 10 }}>
                    Repeat Password
                    <br />
                    <input
                        type="password"
                        placeholder="Repeat Password"
                        name="passwordValidation"
                        value={passwordValidation}
                        onChange={this.handleChange.bind(this)}
                    />
                </div>
                {
                    error && <><small style={{ color: 'red' }}>{error}</small><br /></>
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
                <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={this.handleRegisterButton.bind(this)} disabled={loading} /><br />
                <p>Already have an account? <NavLink to="/login">Login here!</NavLink></p>
            </Layout>
        );
    }
}
