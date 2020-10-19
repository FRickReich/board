import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IUserSetting extends Document
{
    isMember: boolean;
    isModerator: boolean;
    isAdmin: boolean;

    isEmailHidden: boolean;
}

const schema: Schema = new Schema({
    isMember:
    {
        type: Boolean,
        default: true
    },
    isModerator:
    {
        type: Boolean,
        default: false
    },
    isAdmin:
    {
        type: Boolean,
        default: false
    },
    isEmailHidden:
    {
        type: Boolean,
        default: true
    }

});

export default mongoose.model<IUserSetting>('UserSetting', schema, 'UserSettings', true);
