import React, { useState } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import moment from 'moment';

const IndexSubCategory = ({ data }) =>
{
    const getThreadCount = (threads) =>
    {
        return threads.length.toString();
    };

    const getPostCount = (threads) =>
    {
        let postCount = 0;

        for(const thread of threads)
        {
            postCount += thread.posts.length;
        }

        return postCount.toString();
    };

    const Counter = (thread) =>
    {
        return { threads: getThreadCount(thread), posts: getPostCount(thread) }
    }

    const newestPost = (inputThreads) =>
    {
        const posts = [];

        for(const thread of inputThreads)
        {
            for(const post of thread.posts)
            {
                posts.push(post);
            }
        }

        const newestPost = posts.reduce((newestPost, post) =>
        {
            return post.updatedAt > newestPost.updatedAt ? post : newestPost;
        });

        return ({
            user:
            {
                name: newestPost.authorId.profile.userName,
                slug: newestPost.authorId.slug,
                id: newestPost.authorId._id
            },
            thread:
            {
                title: newestPost.parent.title,
                slug: newestPost.parent.slug,
                id: newestPost.parent._id
            },
            post:
            {
                date: newestPost.updatedAt,
                id: newestPost._id
            }
        });
    };

    return(
        <div className="SubCategory">
            <p><NavLink to={`/board/${data.slug}`}>{ data.title }</NavLink></p>
            <p>{ data.description && data.description }</p>
            <p>threads: { Counter(data.threads).threads }</p>
            <p>posts: { Counter(data.threads).posts }</p>
            <div>
                <b>Newest:</b>
                <p>by <NavLink to={`/user/${newestPost(data.threads).user.slug}`}>{ newestPost(data.threads).user.name }</NavLink></p>
                <p>in <NavLink to={`/board/${data.slug}/${newestPost(data.threads).thread.slug}#${newestPost(data.threads).post.id}`}>{ newestPost(data.threads).thread.title }</NavLink></p>
                <p>{ moment.parseZone(newestPost(data.threads).post.date).fromNow() }</p>
            </div>

        </div>
    );
};

export { IndexSubCategory };
