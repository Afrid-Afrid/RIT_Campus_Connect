import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Attendance() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/attendance", { params: { student: user?.id } }).then((res) =>
      setRecords(res.data)
    );
  }, [user]);

  return (
    <div className="container">
      <h2>Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.course?.name}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
