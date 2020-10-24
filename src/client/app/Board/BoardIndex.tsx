import React, { useState, useEffect } from 'react';
import { Layout } from '../Layout/Main';
import axios from 'axios';
import { AdminRoleComponent, GuestRoleComponent, MemberRoleComponent, ModeratorRoleComponent } from '../Utils/RoleComponent';

const BoardIndex = () =>
{
    const [ boardData, setBoardData ] = useState<any>(null);
    const [ errorMessage, setErrorMessage ] = useState<object>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/board/index').then((response) =>
        {
            setBoardData(response.data.board[0]);
        }).catch(error =>
        {
            setErrorMessage({ isLoading: false, error: 'no board created yet.' });
            console.log(error);
        });
    }, []);

    return(
        <Layout>
            <h2>Board Index</h2>

            {
                boardData &&
                <>
                <p>Categories:</p>
                <ul>
                    {
                        boardData.categories.map((category, i: number) =>
                        {
                            return (
                                <li key={i}>
                                    <p>title: { category.title }</p>
                                    <ul>
                                        {
                                            category.subCategories &&
                                            category.subCategories.map((subCategory, j: number) =>
                                            {
                                                return(
                                                    <li key={j}>
                                                        <p>title: {subCategory.title}</p>
                                                        <ul>
                                                            {
                                                                subCategory.threads &&
                                                                subCategory.threads.map((thread, k: number) => {
                                                                    return(
                                                                        <li key={k}>
                                                                            <li>
                                                                                <p>{ thread.title }</p>
                                                                                <p>author: { thread.authorId.profile.userName }</p>
                                                                                <ul>
                                                                                    {
                                                                                        thread.posts &&
                                                                                        thread.posts.map((post, l: number) =>
                                                                                        {
                                                                                            return(
                                                                                                <li>
                                                                                                    <p>{ post.body }</p>
                                                                                                    <p>date: { post.updatedAt }</p>
                                                                                                    <p>by: { post.authorId.profile.userName }</p>
                                                                                                </li>
                                                                                            );
                                                                                        })
                                                                                    }
                                                                                </ul>
                                                                            </li>
                                                                        </li>
                                                                    );
                                                                })
                                                            }
                                                        </ul>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                            );
                        })
                    }
                </ul>
                <hr/>
                </>
            }

            <AdminRoleComponent><p>Admin Boards View</p></AdminRoleComponent>
            <ModeratorRoleComponent><p>Moderator Board View</p></ModeratorRoleComponent>
            <MemberRoleComponent><p>Member Board View</p></MemberRoleComponent>
            <GuestRoleComponent><p>Guest Board View</p></GuestRoleComponent>
        </Layout>
    );
};

export { BoardIndex };
