import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Layout } from '../../Layout/Main/Main';
import { LoadingIndicator } from '../../Components/LoadingIndicator/LoadingIndicator';

export const Profile = ({ match }) =>
{
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ userData, setUserData ] = useState<object>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>(null);

    useEffect(() => {
        const username : string = match.params.userId.toString();

        axios.get(`http://localhost:3000/api/user/get/username/${username}`).then((response: object) =>
        {
            setUserData(response['data']['user']);
            setLoading(false);
        }).catch(error =>
        {
            setErrorMessage('no board created yet.');
            setLoading(false);
        });
    }, []);

    return(
        <Layout>
        {
                loading ?
                (
                    <LoadingIndicator />
                )
                :
                (
                    <>
                        <p><b>username:</b> { userData['username'] }</p>
                        {
                            userData['email'] !== 'hidden' &&
                            <p><b>email:</b> { userData['email'] } </p>
                        }
                        <p><b>member since:</b> { moment(userData['signUpDate']).fromNow() }</p>
                        <p><b>role:</b> { userData['role'] }</p>
                    </>
                )
            }
        </Layout>
    );
};
