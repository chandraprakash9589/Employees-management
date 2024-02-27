import mongoose, { Document, Schema } from "mongoose";
interface IChangeStatus extends Document {
  Status: string;
  Hours: string;
  Note: string;
  user: any;
}

const changeStatusSchema = new Schema<IChangeStatus>({
  Status: {
    type: String,
    required: true,
  },
  Hours: {
    type: String,
    required: true,
  },
  Note: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const ChangeStatus = mongoose.model<IChangeStatus>(
  "ChangeStatus",
  changeStatusSchema
);
export default ChangeStatus;
