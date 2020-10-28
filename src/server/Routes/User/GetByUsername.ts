import { Request, Response } from 'express';
import User, { IUser } from '../../Models/User';

export interface IUserFound
{
    username: string;
    email: string;
    signUpDate: Date;
    role: string;
}

export const userGetByUsernameRoute = (req: Request, res: Response) =>
{
    const { params } = req;
    const { username } = params;

    User.findOne({ 'profile.userName': username }, (err: Error, user: IUser) =>
    {
        if(err)
        {
            return res.status(401).json({
                success: false,
                error: true,
                message: err.message
            });
        }
        if(user)
        {
            const foundUser : IUserFound = {
                username: user.profile.userName,
                email : user.settings.isEmailHidden ? 'hidden' : user.email,
                signUpDate: user.signUpDate,
                role: user.settings.isAdmin ? 'admin' : user.settings.isModerator ? 'moderator' : 'member'
            };

            return res.send({ success: true, user: foundUser });
        }
        else
        {
            return res.status(401).json({
                success: false,
                error: true,
                message: 'User not found.'
            });
        }
    });
};
