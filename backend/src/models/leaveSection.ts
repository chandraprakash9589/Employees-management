import mongoose, { Document, Schema } from "mongoose";
interface ILeave extends Document {
  email: string[];
  leaveType: string;
  fromDate: string;
  ToDate: string;
  fromSession: string;
  toSession: string;
  days: number;
  reason: string;
  status: string;
  user: any;
  userEmail: string;
  firstName: string;
  lastName: string;
}
const leaveSchema = new Schema<ILeave>({
  email: {
    type: [String],
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  ToDate: {
    type: String,
    required: true,
  },
  fromSession: {
    type: String,
    required: true,
  },
  toSession: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Cancelled"],
    default: "Pending",
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const LeaveSections = mongoose.model<ILeave>("LeaveSections", leaveSchema);

export default LeaveSections;
