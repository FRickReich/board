import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken, getCleanUser } from '../../utils';
import User, { IUser } from '../../Models/User';

const mockUser =
{
    _id: '12345',
    password: 'test',
    name: 'F. Rick Reich',
    email: 'test@test.com',
    username: 'frickreich',
    isAdmin: true
};

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

    User.findOne({ email }, (err: Error, user: IUser) =>
    {
        // if (email !== user.email || password !== user.password)
        // {
        //     return res.status(401).json({
        //         error: true,
        //         message: 'Username or Password is Wrong.'
        //     });
        // }

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

    // if (email !== mockUser.email || password !== mockUser.password)
    // {
    //     return res.status(401).json({
    //         error: true,
    //         message: 'Username or Password is Wrong.'
    //     });
    // }

    // const token = generateToken(mockUser);
    // const userObj = getCleanUser(mockUser);

    // return res.json({ user: userObj, token });
};
