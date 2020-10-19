import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IUserProfile extends Document
{
    firstName: string;
    lastName: string;
    userName: string;
    trophys: string[];
}

const schema: Schema = new Schema({
    firstName:
    {
        type: String
    },
    lastName: {
        type: String
    },
    userName:
    {
        type: String
    },
    trophys:
    {
        type: Array(String)
    }

});

export default mongoose.model<IUserProfile>('UserProfile', schema, 'UserProfiles', true);
