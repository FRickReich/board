import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import { Layout } from '../../Layout/Main/Main';
import moment from 'moment';
import { LoadingIndicator } from '../../Shared/Components/LoadingIndicator/LoadingIndicator';

const SubCategoryIndex = () =>
{
    const { slug } = useParams();

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ subCategoryData, setSubCategoryData ] = useState<object>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/board/subCategory/${ slug }`).then((response) =>
        {
            setSubCategoryData(response.data.subCategory);
            setLoading(false);
        }).catch(error =>
        {
            setErrorMessage('no Sub-Categories created yet.');
            setLoading(false);
        });
    }, []);

    const getPostCount = (posts) =>
    {
        return posts.length.toString();
    };

    const newestPost = (inputThread) =>
    {
        const posts = [];

        for(const post of inputThread.posts)
        {
            posts.push(post);
        }

        const newestPost = posts.reduce((newestPost, post) =>
        {
            return post.updatedAt > newestPost.updatedAt ? post : newestPost;
        });

        return ({
            user: {
                name: newestPost.authorId.profile.userName,
                slug: newestPost.authorId.slug,
                id: newestPost.authorId._id
            },
            post: {
                date: newestPost.updatedAt,
                id: newestPost._id
            }
        });
    };

    return(
        <Layout>
            {
                loading ?
                (
                    <LoadingIndicator />
                )
                :
                (
                    <div className="SubCategoryView">
                        <h2>{subCategoryData['title']}</h2>

                        <div>
                            {
                                subCategoryData['threads'].map((thread, i: number) => {
                                    return (
                                        <div key={i}>
                                            <p><NavLink to={ `/board/${thread.parent.slug}/${thread.slug}` }>{ thread.title }</NavLink></p>
                                            <p>by <NavLink to={ `` }>{ thread.authorId.profile.userName }</NavLink></p>
                                            <p>Posts: { getPostCount(thread.posts) }</p>
                                            {/* <p>Views: </p> */}
                                            <div>
                                                <p><NavLink to={ `/board/${thread.parent.slug}/${thread.slug}#${newestPost(thread).post.id}` }>Latest Post</NavLink></p>
                                                <p>by { newestPost(thread).user.name }</p>
                                                <p>{ moment.parseZone(newestPost(thread).post.date).fromNow() }</p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                )
            }
        </Layout>
    );
};

export { SubCategoryIndex };
