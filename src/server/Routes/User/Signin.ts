import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken, getCleanUser } from './../../Utils';
import User, { IUser } from '../../Models/User';

export const userSinginRoute = (req: Request, res: Response) =>
{
    const { body } = req;
    const { email, password } = body;

    if (!email || !password)
    {
        return res.status(400).json({
            error: true,
            message: 'Username or Password required.'
        });
    }
    else
    {
        User.findOne({ email }, (err: Error, user: IUser) =>
        {
            if (err)
            {
                return res.status(401).json({
                    success: false,
                    error: true,
                    message: 'Error: server error'
                });
            }

            if (!bcrypt.compareSync(password, user.password))
            {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            const token = generateToken(user);
            const userObj = getCleanUser(user);

            return res.json({ user: userObj, token });
        });
    }
};
