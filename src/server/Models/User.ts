import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;
// import ObjectId = mongoose.Schema.Types.ObjectId;
import bcrypt from 'bcrypt';
import UserProfile, { IUserProfile } from './UserProfile';
import UserSetting, { IUserSetting } from './UserSettings';

export interface IUser extends Document
{
    email: string;
    password: string;
    verificationToken: string;
    isVerified: boolean;
    signUpDate: Date;
    lastLoginDate: Date;
    profile: IUserProfile;
    settings: IUserSetting;
    slug: string;
    generateHash(password: string): string;
}

const schema: Schema = new Schema({
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String
    },
    verificationToken:
    {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    signUpDate: {
        type: Date,
        default: Date.now()
    },
    lastLoginDate: {
        type: Date
    },
    profile: UserProfile.schema,
    settings: UserSetting.schema,
    slug:
    {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

schema.methods.generateHash = (password: string) =>
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

export default mongoose.model<IUser>('User', schema, 'Users', true);
