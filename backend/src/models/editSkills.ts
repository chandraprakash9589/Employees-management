import mongoose, { Document, Schema } from "mongoose";

interface IEditskills extends Document {
  beginnerTech: string[];
  intermediateTech: string[];
  proficientTech: string[];
  user: any;
}
const editSkillsSchema = new Schema<IEditskills>({
  beginnerTech: {
    type: [String],
    required: true,
  },
  intermediateTech: {
    type: [String],
    required: true,
  },
  proficientTech: {
    type: [String],
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Editskills = mongoose.model<IEditskills>("Editskills", editSkillsSchema);

export default Editskills;
