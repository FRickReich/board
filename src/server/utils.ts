import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    if (!user) return null;

    const u = {
        _id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    };

    return jwt.sign(u, process.env.JWT_SECRET || 'secret', {
        expiresIn: 60 * 60 * 24
    });
};

export const getCleanUser = (user) => {
    if (!user) return null;

    return {
        _id: user._id,
        email: user.email,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    };
};
