import mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;

export interface IBoardSubCategory extends Document
{
    title: string;
    parent: Schema.Types.ObjectId;
    threads: Schema.Types.ObjectId;
}

const schema: Schema = new Schema({
    title:
    {
        type: String,
        required: true,
    },
    parent: { type: Schema.Types.ObjectId, ref: 'BoardCategory' },
    threads: [{ type: Schema.Types.ObjectId, ref: 'BoardThread' }]
}, { timestamps: true });

export default mongoose.model<IBoardSubCategory>('BoardSubCategory', schema, 'BoardSubCategories', true);
