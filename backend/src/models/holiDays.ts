import mongoose, { Document, Schema } from "mongoose";

interface IHoliDays extends Document {
  date: Date;
  occasion: string;
  user: any;
}
const holiDaysSchema = new Schema<IHoliDays>({
  date: {
    type: Date,
    required: true,
  },
  occasion: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const HoliDays = mongoose.model<IHoliDays>("HoliDays", holiDaysSchema);

export default HoliDays;
