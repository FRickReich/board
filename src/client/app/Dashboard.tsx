import React, { Component } from 'react';
import { getUser } from './Utils/Common';
import { withRouter } from 'react-router-dom';
import { Layout } from './Layout';

type MyProps = {};
type MyState = {
    user: any
};

class Dashboard extends Component<MyProps, MyState>
{
    constructor(props)
    {
        super(props);
    }

    state =
    {
        user: getUser()
    };

    render()
    {
        const { user } = this.state;

        return(
            <Layout>
                Dashboard...
                {user.role === "member" && <p>Role: Member</p>}
                {user.role === "moderator" && <p>Role: Moderator</p>}
                {user.role === "admin" && <p>Role: Admin</p>}
            </Layout>
        );
    }
}

export default withRouter(Dashboard);
