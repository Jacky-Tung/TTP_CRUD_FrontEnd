import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampusThunk } from "../redux/campuses/campuses.actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Image, Form, Col, Row, Card } from "react-bootstrap";
import {
  removeStudentFromCampusThunk,
  fetchAllStudentsThunk,
  addStudentToCampusThunk,
} from "../redux/students/students.actions";

const Campus = () => {
  const { campus, students } = useSelector((state) => state.campuses.campus);
  const allStudents = useSelector((state) => state.students.allStudents);
  console.log("campus", campus);
  console.log("students", students);
  const { campusId } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    dispatch(fetchCampusThunk(campusId));
    dispatch(fetchAllStudentsThunk());
  }, [students, campusId, dispatch]);

  const editCampus = () => {
    return nav(`/editCampus/${campusId}`);
  };

  const handleSelect = (event) => {
    setStudentId(event.target.value);
  };

  return (
    <div>
      {campus ? (
        <div key={campus.id}>
          <Row>
            <Col
              md
              className="header"
              style={{ marginTop: "50px", marginLeft: "90px" }}
            >
              <Image
                src={campus.imageUrl}
                style={{ width: "400px", height: "auto" }}
                rounded
              ></Image>
            </Col>
            <Col sm className="header" style={{ marginRight: "90px" }}>
              <div className="header">
                <h1>{campus.name}</h1>
                <h2>{campus.address}</h2>
              </div>
            </Col>
          </Row>
          <h2 className="header">{campus.description}</h2>
        </div>
      ) : (
        <h1 className="header">Loading...</h1>
      )}
      <div style={{ marginLeft: "50px", marginRight: "50px" }}>
        <h3 className="header">Students Not Enrolled In Any Campus</h3>
        <Form.Select onChange={handleSelect} value={studentId}>
          <option value="">Select Student</option>
          {allStudents &&
            allStudents
              .filter((student) => !student.campusId)
              .map((student) => (
                <option value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
        </Form.Select>
        <div className="formButton">
          <Button
            onClick={() => {
              return dispatch(addStudentToCampusThunk(studentId, campusId));
            }}
            style={{ margin: "20px" }}
          >
            Add Student To Campus
          </Button>
          <Button onClick={editCampus}>Edit Campus</Button>
        </div>
      </div>
      <div style={{marginLeft: "20px", marginRight: "20px"}}>
        <h2 className="header">Students on campus</h2>
        {students && students.length > 0 ? (
          <div className="list">
            {students.map((student) => {
              return (
                <Col>
                  <Card
                    key={student.id}
                    style={{ width: "202px", height: "290px" }}
                  >
                    <Image
                      src={student.imageUrl}
                      style={{ width: "200px", height: "175px" }}
                    ></Image>
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/students/${student.id}`}>
                          {student.firstName} {student.lastName}
                        </Link>
                        <Button
                          onClick={() => {
                            return dispatch(
                              removeStudentFromCampusThunk(
                                student.firstName,
                                student.lastName,
                                student.email,
                                student.gpa,
                                student.imageUrl,
                                student.id
                              )
                            );
                          }}
                          className="cardButton"
                        >
                          Remove
                        </Button>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </div>
        ) : (
          <h5 className="header">There are no students currently registered to this campus.</h5>
        )}
      </div>
    </div>
  );
};

export default Campus;

/** Rendering
- [ ] Write a component to display a single campus with the following information:
- [ ] The campus's name, image, address and description
- [ ] A list of the names of all students in that campus (or a helpful message if it doesn't have any students) 
 */

/** Router (sending clicked on campus' id to thunk 
 * in order to update the store by retrieving data
 *  from db for the clicked on campus)
- [ ] Display the appropriate campus's info when the url matches `/campuses/:campusId`
- [ ] Clicking on a campus from the all-campuses view should navigate to show that campus in the single-campus view
 */
