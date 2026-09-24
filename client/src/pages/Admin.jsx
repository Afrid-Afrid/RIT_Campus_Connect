import { useEffect, useState } from "react";
import api from "../services/api";

const TABS = ["Students", "Courses", "Events", "Attendance"];

export default function Admin() {
  const [tab, setTab] = useState("Students");

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{ opacity: tab === t ? 1 : 0.6 }}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Students" && <StudentsTab />}
      {tab === "Courses" && <CoursesTab />}
      {tab === "Events" && <EventsTab />}
      {tab === "Attendance" && <AttendanceTab />}
    </div>
  );
}

function StudentsTab() {
  const [students, setStudents] = useState([]);

  const load = () => api.get("/students").then((res) => setStudents(res.data));

  useEffect(() => {
    load();
  }, []);

  const deleteStudent = async (id) => {
    await api.delete(`/students/${id}`);
    load();
  };

  return (
    <div className="card">
      <h3>Students ({students.length})</h3>
      <table>
        <thead>
          <tr>
            <th>USN</th>
            <th>Name</th>
            <th>Department</th>
            <th>Enrolled Courses</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.usn}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
              <td>{s.enrolledCourses.map((c) => c.code).join(", ") || "-"}</td>
              <td>
                <button onClick={() => deleteStudent(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CoursesTab() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    name: "",
    code: "",
    faculty: "",
    credits: "",
    department: "",
    semester: "",
  });
  const [error, setError] = useState("");

  const load = () => api.get("/courses").then((res) => setCourses(res.data));

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/courses", {
        ...form,
        credits: Number(form.credits),
        semester: Number(form.semester),
      });
      setForm({ name: "", code: "", faculty: "", credits: "", department: "", semester: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course");
    }
  };

  const deleteCourse = async (id) => {
    await api.delete(`/courses/${id}`);
    load();
  };

  return (
    <>
      <div className="card">
        <h3>Add Course</h3>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Course Name" value={form.name} onChange={handleChange} />
          <input name="code" placeholder="Course Code" value={form.code} onChange={handleChange} />
          <input name="faculty" placeholder="Faculty" value={form.faculty} onChange={handleChange} />
          <input name="credits" type="number" placeholder="Credits" value={form.credits} onChange={handleChange} />
          <input name="department" placeholder="Department" value={form.department} onChange={handleChange} />
          <input name="semester" type="number" placeholder="Semester" value={form.semester} onChange={handleChange} />
          {error && <p className="error">{error}</p>}
          <button type="submit">Add Course</button>
        </form>
      </div>

      <div className="card">
        <h3>Courses ({courses.length})</h3>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Faculty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c._id}>
                <td>{c.code}</td>
                <td>{c.name}</td>
                <td>{c.faculty}</td>
                <td>
                  <button onClick={() => deleteCourse(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function EventsTab() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", date: "" });
  const [error, setError] = useState("");

  const load = () => api.get("/events").then((res) => setEvents(res.data));

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/events", form);
      setForm({ title: "", description: "", date: "" });
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    }
  };

  const deleteEvent = async (id) => {
    await api.delete(`/events/${id}`);
    load();
  };

  return (
    <>
      <div className="card">
        <h3>Add Event</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Event Title" value={form.title} onChange={handleChange} />
          <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input name="date" type="date" value={form.date} onChange={handleChange} />
          {error && <p className="error">{error}</p>}
          <button type="submit">Add Event</button>
        </form>
      </div>

      <div className="card">
        <h3>Events ({events.length})</h3>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Registrations</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e._id}>
                <td>{e.title}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
                <td>{e.registrations.length}</td>
                <td>
                  <button onClick={() => deleteEvent(e._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function AttendanceTab() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [statusMap, setStatusMap] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data));
  }, []);

  useEffect(() => {
    if (!selectedCourse) {
      setStudents([]);
      return;
    }
    api.get("/students", { params: { course: selectedCourse } }).then((res) => {
      setStudents(res.data);
      const defaults = {};
      res.data.forEach((s) => (defaults[s._id] = "Present"));
      setStatusMap(defaults);
    });
  }, [selectedCourse]);

  const handleStatusChange = (studentId, value) => {
    setStatusMap({ ...statusMap, [studentId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Promise.all(
      students.map((s) =>
        api.post("/attendance", {
          student: s._id,
          course: selectedCourse,
          date,
          status: statusMap[s._id],
        })
      )
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="card">
      <h3>Mark Attendance</h3>
      <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Select a course</option>
        {courses.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name} ({c.code})
          </option>
        ))}
      </select>

      {selectedCourse && (
        <form onSubmit={handleSubmit}>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          {students.length === 0 ? (
            <p>No students are enrolled in this course yet.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>USN</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.usn}</td>
                    <td>{s.name}</td>
                    <td>
                      <select
                        value={statusMap[s._id] || "Present"}
                        onChange={(e) => handleStatusChange(s._id, e.target.value)}
                      >
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {saved && <p>Attendance saved.</p>}
          {students.length > 0 && <button type="submit">Save Attendance</button>}
        </form>
      )}
    </div>
  );
}
