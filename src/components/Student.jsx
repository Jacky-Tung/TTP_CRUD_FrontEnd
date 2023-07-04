import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { fetchStudentThunk } from "../redux/students/students.actions";
import { Link } from "react-router-dom";

const Student = () => {
  const { student, campus } = useSelector((state) => state.students.student);
  console.log("Student", student);
  console.log("Campus", campus);
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const fetchStudent = () => {
    return dispatch(fetchStudentThunk(studentId));
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const editStudent = () => {
    return nav(`/editStudent/${studentId}`);
  };

  return (
    <div>
      {student ? (
        <div key={student.id}>
          <Image src={student.imageUrl}></Image>
          <h1>
            {student.firstName} {student.lastName}
          </h1>
          <h2>Email: {student.email}</h2>
          <h2>GPA: {student.gpa}</h2>
          {campus ? (
            <h2>
              Campus: <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
            </h2>
          ) : (
            <h5>This student is not registered to a campus.</h5>
          )}
          <Button onClick={editStudent}>Edit Student</Button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Student;
