import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Layout } from '../Layout/Main';
import moment from 'moment';

const ThreadView = () =>
{
    const { slug, subCategorySlug } = useParams();

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ threadData, setThreadData ] = useState<object>(null);
    const [ errorMessage, setErrorMessage ] = useState<string>(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/board/thread/`, {params: { slug, subCategorySlug }}).then((response) =>
        {
            setThreadData(response.data.thread);
            setLoading(false);
        }).catch(error =>
        {
            setErrorMessage('Thread not found.');
            setLoading(false);
        });
    }, []);

    return(
        <Layout>
            {
                loading ?
                (
                    <div>Loading...</div>
                )
                :
                (
                    <div>
                        <h2>{threadData['title']}</h2>

                        <div>
                            {
                                threadData['posts'].sort((a, b) => a.createdAt - b.createdAt).map((post, i) =>
                                {
                                    return (
                                        <div key={i} id={ post._id.toString() }>
                                            <div>Author: { post.authorId.profile.userName }</div>
                                            <div>Body:
                                                <br />
                                                <ReactMarkdown children={ post.body } />
                                            </div>
                                            <div>Posted: { moment.parseZone(post.createdAt).fromNow() }</div>
                                            { post.createdAt !== post.updatedAt && <div>Edited: { moment.parseZone(post.updatedAt).fromNow() } </div> }
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <div>
                            <input type="text" name="body"/>
                            <button>Post</button>
                        </div>
                    </div>
                )
            }
        </Layout>
    );
};

export { ThreadView };
