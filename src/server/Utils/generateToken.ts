import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    if (!user) return null;

    const u = {
        _id: user._id,
        email: user.email,
        profile: user.profile,
        role: user.settings.isAdmin ? 'admin' : user.settings.isModerator ? 'moderator' : 'member'
    };

    return jwt.sign(u, process.env.JWT_SECRET || 'secret', {
        expiresIn: 60 * 60 * 24
    });
};
