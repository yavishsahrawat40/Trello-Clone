import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document{
    content: string;
}

const TaskSchema = new Schema({
    content: {type: String, required: true},
});

export default mongoose.model<ITask>("Task", TaskSchema);