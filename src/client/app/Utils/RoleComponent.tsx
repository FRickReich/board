import { getUser } from './Common';

const user = getUser() || null;

export const AdminRoleComponent = ({ children }) =>
{
    return user && user.role === 'admin' && children;
};

export const ModeratorRoleComponent = ({ children }) =>
{
    return user && user.role === 'moderator' && children;
};

export const MemberRoleComponent = ({ children }) =>
{
    return user && user.role === 'member' && children;
};

export const GuestRoleComponent = ({ children }) =>
{
    return user === null && children;
};
