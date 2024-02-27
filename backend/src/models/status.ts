import mongoose, { Document, Schema } from "mongoose";

interface IStatus extends Document {
  status: string;
  user: any;
}
const statusSchema = new Schema<IStatus>({
  status: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Status = mongoose.model<IStatus>("Project", statusSchema);

export default Status;
