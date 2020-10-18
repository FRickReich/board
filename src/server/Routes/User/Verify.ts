import { Request, Response } from 'express';
import { getCleanUser } from '../../utils';
import jwt from 'jsonwebtoken';

const mockUser =
{
    _id: '12345',
    password: 'test',
    name: 'F. Rick Reich',
    email: 'test@test.com',
    username: 'frickreich',
    isAdmin: true
};

export const userVerifyRoute = (req: Request, res: Response) =>
{
    const token = req.body.token || req.query.token;

    if (!token)
    {
        return res.status(400).json({
            error: true,
            message: 'Token is required.'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) =>
    {
        if (err)
        {
            return res.status(401).json({
                error: true,
                message: 'Invalid token.'
            });
        }

        if (user._id !== mockUser._id)
        {
            return res.status(401).json({
                error: true,
                message: 'Invalid user.'
            });
        }

        const userObj = getCleanUser(mockUser);

        return res.json({ user: userObj, token });
    });
};
