import mongoose, { Document, Schema } from "mongoose";

interface IDiscussionDesk extends Document {
  topic: string;
  detail: string;
  dueDate: Date;
  talkWith: string;
  isItUrgent: string;
  status: string;
  user: any;
  userEmail: string;
  firstName: string;
  lastName: string;
}
const discussionDeskSchema = new Schema<IDiscussionDesk>({
  topic: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  talkWith: {
    type: String,
    required: true,
  },
  isItUrgent: {
    type: String,
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
    enum: ["Pending", "Resolved"],
    default: "Pending",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const DiscussionDesk = mongoose.model<IDiscussionDesk>(
  "DiscussionDesk",
  discussionDeskSchema
);

export default DiscussionDesk;
