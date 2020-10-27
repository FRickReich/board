import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Layout } from '../Layout/Main/Main';
import moment from 'moment';
import { LoadingIndicator } from '../Components/LoadingIndicator/LoadingIndicator';
import { PostEditor } from './PostEditor';

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
                    <LoadingIndicator />
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
                                            <div><b>Author:</b> { post.authorId.profile.userName }</div>
                                            <div><b>Body:</b>
                                                <br />
                                                <ReactMarkdown children={ post.body } />
                                            </div>
                                            <div><b>Posted:</b> { moment.parseZone(post.createdAt).fromNow() }</div>
                                            { post.createdAt !== post.updatedAt && <div>Edited: { moment.parseZone(post.updatedAt).fromNow() } </div> }
                                        </div>
                                    );
                                })
                            }
                        </div>

                        <PostEditor />
                    </div>
                )
            }
        </Layout>
    );
};

export { ThreadView };
