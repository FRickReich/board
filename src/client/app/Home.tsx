import React from 'react';
import { Layout } from './Layout';
import { getToken } from './Utils/Common';

const Home = () =>
{
    const token = getToken() || '';

    return(
        <Layout>
            Home...
        </Layout>
    );
};

export { Home };
