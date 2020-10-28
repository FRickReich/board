import React, { useState, useEffect } from 'react';
import { Layout } from '../../Layout/';
import { getUser } from '../../Utils/Common';

const Dashboard = () =>
{
    const [ user, setUser ] = useState<any>(null);

    useEffect(() => {
        setUser(getUser());
    }, []);

    return(
        <Layout>
            Dashboard...

            {
                user &&
                <>
                    {user.role === 'member' && <p>Role: Member</p>}
                    {user.role === 'moderator' && <p>Role: Moderator</p>}
                    {user.role === 'admin' && <p>Role: Admin</p>}
                </>
            }
        </Layout>
    );
};

export { Dashboard };
