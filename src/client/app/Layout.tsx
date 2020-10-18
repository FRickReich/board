import React from 'react';
import PageHeader from './PageHeader';

const Layout = ({ children }) =>
{
    return(
        <div>
            <PageHeader />
            <br />
            { children }
        </div>
    );
};

export { Layout };
