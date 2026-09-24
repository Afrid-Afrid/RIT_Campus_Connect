import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <nav className="navbar">
      <strong>CampusConnect</strong>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/courses">Courses</Link>
      <Link to="/attendance">Attendance</Link>
      <Link to="/events">Events</Link>
      <Link to="/profile">Profile</Link>
      {user.role === "admin" && <Link to="/admin">Admin</Link>}
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Logout
      </button>
    </nav>
  );
}
