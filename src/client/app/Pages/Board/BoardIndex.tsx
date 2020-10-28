import React, { useState, useEffect } from 'react';
import { Layout } from '../../Layout/Main/Main';
import axios from 'axios';
import { AdminRoleComponent, GuestRoleComponent, MemberRoleComponent, ModeratorRoleComponent } from '../../Utils/RoleComponent';
import { IndexCategory } from './Components/Category/Category';

import './Board.scss';
import { LoadingIndicator } from '../../Shared/Components/LoadingIndicator/LoadingIndicator';

const BoardIndex = () =>
{
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ boardData, setBoardData ] = useState<object>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/board/index').then((response) =>
        {
            setBoardData(response.data.board[0]);
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
                    <LoadingIndicator/>
                )
                :
                (
                    <div className="Board">
                        <h2>Board Index</h2>
                        {
                            boardData['categories'].map((category, i: number) =>
                            {
                                return (
                                    <IndexCategory key={i} data={ category } />
                                );
                            })
                        }
                    </div>
                )
            }

            <AdminRoleComponent><p>Admin Boards View</p></AdminRoleComponent>
            <ModeratorRoleComponent><p>Moderator Board View</p></ModeratorRoleComponent>
            <MemberRoleComponent><p>Member Board View</p></MemberRoleComponent>
            <GuestRoleComponent><p>Guest Board View</p></GuestRoleComponent>
        </Layout>
    );
};

export { BoardIndex };
