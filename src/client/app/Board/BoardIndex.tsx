import React, { useState } from 'react';
import { Layout } from '../Layout/Main';
import { AdminRoleComponent, GuestRoleComponent, MemberRoleComponent, ModeratorRoleComponent } from '../Utils/RoleComponent';

const BoardIndex = () =>
{
    return(
        <Layout>
            <h1>Board Index</h1>

            <AdminRoleComponent><p>Admin Boards View</p></AdminRoleComponent>
            <ModeratorRoleComponent><p>Moderator Board View</p></ModeratorRoleComponent>
            <MemberRoleComponent><p>Member Board View</p></MemberRoleComponent>
            <GuestRoleComponent><p>Guest Board View</p></GuestRoleComponent>
        </Layout>
    );
};

export { BoardIndex };
