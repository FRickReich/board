import React from 'react';

const Page = ({ children }) =>
{
    return(
        <div className="Page">
            <hr />
            { children }
            <hr />
        </div>
    );
};

export { Page };
