import { IUser } from "../Models/User";

export const getCleanUser = (user: IUser) => {
    if (!user) return null;

    return {
        _id: user._id,
        email: user.email,
        profile: user.profile,
        role: user.settings.isAdmin ? 'admin' : user.settings.isModerator ? 'moderator' : 'member'
    };
};
