export const getCleanUser = (user) => {
    if (!user) return null;

    return {
        _id: user._id,
        email: user.email,
        profile: user.profile,
        role: user.settings.isAdmin ? 'admin' : user.settings.isModerator ? 'moderator' : 'member'
    };
};
