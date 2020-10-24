import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IBoard extends Document
{
    title: string;
    categories: Schema.Types.ObjectId[];
    adminUser: Schema.Types.ObjectId;
}

const schema: Schema = new Schema({
    title:
    {
        type: String,
        required: true,
        unique: true
    },
    categories: [{ type: Schema.Types.ObjectId, ref: 'BoardCategory' }],
    adminUser: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true }).post('save', () => {});

export default mongoose.model<IBoard>('Board', schema, 'Boards', true);
