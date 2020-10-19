import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Layout } from './Layout';

type ComponentProps =
{
    match: any
};

type ComponentStates =
{
    isLoading: boolean,
    userData: object,
    error: string
};

class Profile extends Component<ComponentProps, ComponentStates>
{
    constructor(props)
    {
        super(props);
    }

    state =
    {
        isLoading: true,
        userData: null,
        error: null
    };

    componentDidMount = () =>
    {
        const { match } = this.props;
        const username : string = match.params.userId.toString();

        axios.get(`http://localhost:3000/api/user/get/username/${username}`).then((response: object) =>
        {
            this.setState({
                isLoading: false,
                userData: response['data']['user']
            });
        }).catch(error =>
        {
            this.setState({ isLoading: false, error: 'user not found' });
        });
    }

    render = () =>
    {
        const { match } = this.props;
        const { isLoading, userData } = this.state;

        return(
            <Layout>
            {
                isLoading && isLoading ?
                (
                    <p>Loading...</p>
                )
                :
                (
                    <>
                        <p><b>username:</b> { userData.username }</p>
                        {
                            userData.email !== 'hidden' &&
                            <p><b>email:</b> { userData.email } </p>
                        }
                        <p><b>member since:</b> { moment(userData.signUpDate).fromNow() }</p>
                        <p><b>role:</b> { userData.role }</p>
                    </>
                )
            }
            </Layout>
        );
    }
}

export { Profile };
