import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  email: string[];
  status: string;
  projectStatus: string;
  date: Date;
  workingHour: string;
  completed: boolean;
  tasks: {
    projectStatus: string;
    workingHour: string;
    status: string;
    task: string;
  }[];
  user: any;
  userEmail: string;
  firstName: string;
  lastName: string;
}

const taskSchema = new Schema<ITask>({
  email: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  completed: {
    type: Boolean,
    default: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  tasks: [
    {
      projectStatus: {
        type: String,
        required: true,
      },
      workingHour: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      task: {
        type: String,
        required: true,
      },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
