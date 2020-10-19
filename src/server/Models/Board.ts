import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;
import bcrypt from 'bcrypt';
import BoardCategory, { IBoardCategory } from './BoardCategory';

export interface IBoard extends Document
{
    title: string;
    categories: IBoardCategory[];
}

const schema: Schema = new Schema({
    title:
    {
        type: String,
        required: true,
        unique: true
    },
    categories:
    {
        type: Array(BoardCategory),
        default: new BoardCategory({ title: 'General Discussion' })
    }
}).post('save', () => {
    console.log('user profile edited');
});

export default mongoose.model<IBoard>('Board', schema, 'Boards', true);
