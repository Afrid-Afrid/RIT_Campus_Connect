import { useEffect, useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get("/auth/profile").then((res) => setProfile(res.data));
  }, []);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    const { data } = await api.put("/auth/profile", profile);
    setProfile(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!profile) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2>Profile</h2>
        <form onSubmit={handleSave}>
          <input name="name" value={profile.name || ""} onChange={handleChange} />
          <input value={profile.usn || ""} disabled />
          <input value={profile.email || ""} disabled />
          <input name="phone" value={profile.phone || ""} onChange={handleChange} placeholder="Phone" />
          <input name="department" value={profile.department || ""} onChange={handleChange} />
          {saved && <p>Saved.</p>}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
