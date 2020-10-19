import React, { useState } from 'react';
import { Layout } from './Layout';
import { getUser } from './Utils/Common';

const Board = () =>
{
    const [ user ] = useState(getUser());

    return(
        <Layout>
            {
                user ?
                (
                    <>
                        {
                            user.role === 'admin' && <p>admin view</p>
                        }
                        {
                            user.role === 'moderator' && <p>moderator view</p>
                        }
                        {
                            user.role === 'member' && <p>member view</p>
                        }
                    </>
                )
                :
                (
                    <div>guest view</div>
                )
            }
        </Layout>
    );
};

export { Board };
