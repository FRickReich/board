import React from 'react';
import PageHeader from '../Components/PageHeader';

const Main = ({ children }) =>
{
    return(
        <div>
            <PageHeader />
            <hr />
            { children }
            <hr />
            <small>Link to <a href="https://github.com/FRickReich/board">sourcecode Repository</a></small>
        </div>
    );
};

export { Main as Layout };
