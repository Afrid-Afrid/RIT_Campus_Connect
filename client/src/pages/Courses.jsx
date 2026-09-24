import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    const [coursesRes, profileRes] = await Promise.all([
      api.get("/courses"),
      api.get("/auth/profile"),
    ]);
    setCourses(coursesRes.data);
    setEnrolledIds(profileRes.data.enrolledCourses.map((c) => c._id));
  };

  useEffect(() => {
    load();
  }, []);

  const handleEnroll = async (id) => {
    setBusyId(id);
    await api.post(`/students/enroll/${id}`);
    await load();
    setBusyId(null);
  };

  const handleUnenroll = async (id) => {
    setBusyId(id);
    await api.delete(`/students/enroll/${id}`);
    await load();
    setBusyId(null);
  };

  return (
    <div className="container">
      <h2>Courses</h2>
      <p>Enroll in the courses you are taking this semester. Your admin marks attendance for enrolled courses only.</p>
      {courses.map((c) => {
        const isEnrolled = enrolledIds.includes(c._id);
        return (
          <div className="card" key={c._id}>
            <Link to={`/courses/${c._id}`}>{c.name}</Link> ({c.code})
            <div style={{ marginTop: 8 }}>
              {isEnrolled ? (
                <button disabled={busyId === c._id} onClick={() => handleUnenroll(c._id)}>
                  {busyId === c._id ? "Working..." : "Unenroll"}
                </button>
              ) : (
                <button disabled={busyId === c._id} onClick={() => handleEnroll(c._id)}>
                  {busyId === c._id ? "Working..." : "Enroll"}
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
