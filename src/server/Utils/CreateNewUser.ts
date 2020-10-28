import { profile } from 'console';
import mongoose from 'mongoose';
import User, { IUser } from './../Models/User';
import UserProfile from './../Models/UserProfile';
import UserSettings from './../Models/UserSettings';
import { SlugifyString } from './SlugifyString';

interface INewUser { email: string; isVerified: boolean; password: string; }
interface INewUserProfile { userName: string; }
interface INewUserSettings { isAdmin: boolean; isModerator: boolean; isMember: boolean; }

type newUserCallback = ( result?: IUser )  => void;

export const createNewUser = (user : INewUser, userProfile: INewUserProfile, userSettings: INewUserSettings, callback : newUserCallback) : void =>
{
    const newUser = new User(user);

    newUser.password = newUser.generateHash(user.password);
    newUser.profile = new UserProfile(userProfile);
    newUser.settings = new UserSettings(userSettings);
    newUser.slug = SlugifyString(userProfile.userName);

    newUser.profile.userName = 'admin';
    newUser.settings.isAdmin = true;

    newUser
        .save()
        .then(savedUser => callback(savedUser))
        .catch(err => new Error(err));
};