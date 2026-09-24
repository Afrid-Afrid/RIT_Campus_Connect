const Attendance = require("../models/Attendance");

exports.getAttendance = async (req, res) => {
  const filter = {};
  if (req.query.student) filter.student = req.query.student;
  if (req.query.course) filter.course = req.query.course;

  const records = await Attendance.find(filter)
    .populate("student", "name usn")
    .populate("course", "name code");
  res.json(records);
};

exports.markAttendance = async (req, res) => {
  const record = await Attendance.create(req.body);
  res.status(201).json(record);
};

exports.updateAttendance = async (req, res) => {
  const record = await Attendance.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(record);
};
