import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IBoardThread extends Document
{
    title: string;
    authorId: Schema.Types.ObjectId;
    parent: Schema.Types.ObjectId;
    posts: Schema.Types.ObjectId;
    slug: string;
}

const schema: Schema = new Schema({
    title:
    {
        type: String,
        required: true,
        unique: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parent:
    {
        type: Schema.Types.ObjectId,
        ref: 'BoardSubCategory'
    },
    slug:
    {
        type: String,
        required: true,
    },
    posts:[{ type: Schema.Types.ObjectId, ref: 'BoardPost' }]
}, { timestamps: true }).post('save', () => {});

export default mongoose.model<IBoardThread>('BoardThread', schema, 'BoardThreads', true);
