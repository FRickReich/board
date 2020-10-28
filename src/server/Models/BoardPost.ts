import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IBoardPost extends Document
{
    body: string;
    created: Date;
    authorId: Schema.Types.ObjectId;
    parent: Schema.Types.ObjectId;
}

const schema: Schema = new Schema({
    body:
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
        ref: 'BoardThread'
    }
}, {
    timestamps: true
});

export default mongoose.model<IBoardPost>('BoardPost', schema, 'BoardPosts', true);
