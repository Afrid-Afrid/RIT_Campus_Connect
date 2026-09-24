const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    faculty: { type: String, required: true },
    credits: { type: Number, required: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
