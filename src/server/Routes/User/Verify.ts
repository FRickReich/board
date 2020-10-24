import { Request, Response } from 'express';
import { getCleanUser } from './../../Utils';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../../Models/User';

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

    jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, checkUser) =>
    {
        if (err)
        {
            return res.status(401).json({
                error: true,
                message: 'Invalid token.'
            });
        }

        User.findOne({ email: checkUser.email }, (err: Error, user: IUser) =>
        {
            if (err)
            {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: 'Error: server error'
                });
            }

            if(checkUser.email !== user.email)
            {
                return res.status(401).json({
                    error: true,
                    message: 'Invalid user.'
                });
            }

            const userObj = getCleanUser(user);

            return res.json({ user: userObj, token });
        });
    });
};
