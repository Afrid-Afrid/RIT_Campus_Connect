const User = require("../models/User");

exports.getStudents = async (req, res) => {
  const filter = { role: "student" };
  if (req.query.course) filter.enrolledCourses = req.query.course;

  const students = await User.find(filter)
    .select("-password")
    .populate("enrolledCourses", "name code");
  res.json(students);
};

exports.getStudent = async (req, res) => {
  const student = await User.findById(req.params.id)
    .select("-password")
    .populate("enrolledCourses", "name code");
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
};

exports.createStudent = async (req, res) => {
  const student = await User.create({ ...req.body, role: "student" });
  res.status(201).json(student);
};

exports.updateStudent = async (req, res) => {
  const student = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).select("-password");
  res.json(student);
};

exports.deleteStudent = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Student deleted" });
};

// Student self-service: add/remove a course from their own enrolledCourses list.
exports.enrollCourse = async (req, res) => {
  const { courseId } = req.params;

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.enrolledCourses.some((c) => c.toString() === courseId)) {
    return res.status(409).json({ message: "Already enrolled in this course" });
  }

  user.enrolledCourses.push(courseId);
  await user.save();

  const updated = await User.findById(req.user.id)
    .select("-password")
    .populate("enrolledCourses", "name code");
  res.json(updated);
};

exports.unenrollCourse = async (req, res) => {
  const { courseId } = req.params;

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.enrolledCourses = user.enrolledCourses.filter(
    (c) => c.toString() !== courseId
  );
  await user.save();

  const updated = await User.findById(req.user.id)
    .select("-password")
    .populate("enrolledCourses", "name code");
  res.json(updated);
};
