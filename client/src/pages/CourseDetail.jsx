import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/courses/${id}`).then((res) => setCourse(res.data));
  }, [id]);

  if (!course) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="card">
        <h2>{course.name}</h2>
        <p>Code: {course.code}</p>
        <p>Faculty: {course.faculty}</p>
        <p>Credits: {course.credits}</p>
      </div>
    </div>
  );
}
