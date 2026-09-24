import { useEffect, useState } from "react";
import api from "../services/api";

export default function Events() {
  const [events, setEvents] = useState([]);

  const load = () => api.get("/events").then((res) => setEvents(res.data));

  useEffect(() => {
    load();
  }, []);

  const handleRegister = async (id) => {
    await api.post(`/events/${id}/register`);
    load();
  };

  return (
    <div className="container">
      <h2>Upcoming Events</h2>
      {events.map((e) => (
        <div className="card" key={e._id}>
          <h3>{e.title}</h3>
          <p>{new Date(e.date).toLocaleDateString()}</p>
          <button onClick={() => handleRegister(e._id)}>Register</button>
        </div>
      ))}
    </div>
  );
}
