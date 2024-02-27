import mongoose, { Document, Schema } from "mongoose";

interface IProject extends Document {
  projectName: string;
  date: Date;
  action: string;
  user: any;
}
const projectSchema = new Schema<IProject>({
  projectName: {
    type: String,
    required: true,
    default: "None",
  },
  date: {
    type: Date,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
