import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IBoardSubCategory extends Document
{
    title: string;
    description: string;
    parent: Schema.Types.ObjectId;
    threads: Schema.Types.ObjectId;
    slug: string;
}

const schema: Schema = new Schema({
    title:
    {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    parent: { type: Schema.Types.ObjectId, ref: 'BoardCategory' },
    threads: [{ type: Schema.Types.ObjectId, ref: 'BoardThread' }],
    slug:
    {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model<IBoardSubCategory>('BoardSubCategory', schema, 'BoardSubCategories', true);
