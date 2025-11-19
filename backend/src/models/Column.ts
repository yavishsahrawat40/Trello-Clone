import mongoose, { Schema, Document } from "mongoose";

export interface IColumn extends Document{
    title: string;
    taskIds: mongoose.Types.ObjectId[];
}

const ColumnSchema = new Schema({
    title: { type: String, required: true},
    taskIds: [{ type: Schema.Types.ObjectId, ref: "Task"}],
});

export default mongoose.model<IColumn>("Column", ColumnSchema);