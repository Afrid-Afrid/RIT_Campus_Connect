import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ enrolled: 0, events: 0 });

  useEffect(() => {
    const load = async () => {
      const [profile, events] = await Promise.all([
        api.get("/auth/profile"),
        api.get("/events"),
      ]);
      setStats({
        enrolled: profile.data.enrolledCourses.length,
        events: events.data.length,
      });
    };
    load();
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {user?.name}</h2>
      <div className="card" id="student-table">
        <p>Enrolled Courses: {stats.enrolled}</p>
        <p>Upcoming Events: {stats.events}</p>
      </div>
    </div>
  );
}
