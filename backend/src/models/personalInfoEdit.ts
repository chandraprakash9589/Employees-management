import mongoose, { Document, Schema } from "mongoose";

interface IPersonal_info extends Document {
  fatherName: string;
  motherName: string;
  personalEmail: string;
  bloodGroup: string;
  personalContactNum: string;
  emergencyContactNum: string;
  dateOfBirth: string;
  birthDay: string;
  dateOfMarriage: string;
  maritalStatus: string;
  presentAddress: string;
  permanentAddress: string;
  image: string;
  user: any;
}
const personalInfoSchema = new Schema<IPersonal_info>({
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  personalEmail: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  personalContactNum: {
    type: String,
    required: true,
  },
  emergencyContactNum: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  birthDay: {
    type: String,
    required: true,
  },
  dateOfMarriage: {
    type: String,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const PersonalInfo = mongoose.model<IPersonal_info>(
  "PersonalInfo",
  personalInfoSchema
);

export default PersonalInfo;
