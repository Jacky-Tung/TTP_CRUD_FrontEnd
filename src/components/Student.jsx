import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Image, Row, Col } from "react-bootstrap";
import { fetchStudentThunk } from "../redux/students/students.actions";
import { Link } from "react-router-dom";

const Student = () => {
  const { student, campus } = useSelector((state) => state.students.student);
  console.log("Student", student);
  console.log("Campus", campus);
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  useEffect(() => {
    dispatch(fetchStudentThunk(studentId));
  }, [dispatch, studentId]);

  const editStudent = () => {
    return nav(`/editStudent/${studentId}`);
  };

  return (
    <div>
      {student ? (
        <div key={student.id}>
          <Row>
            <Col
              md
              className="header"
              style={{ marginTop: "50px", marginLeft: "90px" }}
            >
              <Image
                src={student.imageUrl}
                style={{ width: "400px", height: "auto" }}
                rounded
              ></Image>
            </Col>
            <Col sm className="header" style={{ marginRight: "90px" }}>
              <h1>
                {student.firstName} {student.lastName}
              </h1>
              <h2>Email: {student.email}</h2>
              <h2>GPA: {student.gpa}</h2>
              {campus ? (
                <h2>
                  Campus:{" "}
                  <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                </h2>
              ) : (
                <h5 className="header">
                  This student is not registered to a campus.
                </h5>
              )}
              <div style={{marginTop: "50px"}}>
                <Button onClick={editStudent}>Edit Student</Button>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <h1 className="header">Loading...</h1>
      )}
    </div>
  );
};

export default Student;
