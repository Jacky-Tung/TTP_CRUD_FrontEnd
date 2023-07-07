import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentThunk,
  fetchAllStudentsThunk,
  editStudentThunk,
} from "../redux/students/students.actions";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";
import { fetchAllCampusesThunk } from "../redux/campuses/campuses.actions";

const EditStudent = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const nav = useNavigate();
  const allCampuses = useSelector((state) => state.campuses.allCampuses);
  const { student, campus } = useSelector((state) => state.students.student);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { studentId } = useParams();
  const [campusId, setcampusId] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0].name;
    console.log(file);
    setSelectedImage(file);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      editStudent(
        form.firstName.value,
        form.lastName.value,
        form.email.value,
        form.gpa.value
      );
      event.preventDefault();
    }
    setValidated(true);
  };

  const editStudent = (firstName, lastName, email, gpa) => {
    dispatch(
      editStudentThunk(
        firstName,
        lastName,
        email,
        gpa,
        selectedImage,
        studentId,
        campusId
      )
    )
      .then(() => {
        setFetchingStudents(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    dispatch(fetchStudentThunk(studentId));
    dispatch(fetchAllCampusesThunk());
    setSelectedImage(student.imageUrl);
    if (campus) setcampusId(campus.id);
    if (fetchingStudents) {
      dispatch(fetchAllStudentsThunk())
        .then(() => {
          nav(`/students/${studentId}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, fetchingStudents, nav, studentId, campus, student.imageUrl]);

  const cancel = () => {
    nav(`/students/${studentId}`);
  };

  const handleSelect = (event) => {
    console.log("Select", event.target.value);
    setcampusId(event.target.value);
  };

  return (
    <div>
      <h1 className="header">Edit Student</h1>
      <div className="form">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="first name"
                defaultValue={student.firstName}
                name="firstName"
              />
              <Form.Control.Feedback type="invalid">
                Please edit student first name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="last name"
                defaultValue={student.lastName}
                name="lastName"
              />
              <Form.Control.Feedback type="invalid">
                Please edit student last name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="email"
                defaultValue={student.email}
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                Please edit student email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>GPA</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min="0"
                max="4"
                placeholder="student gpa"
                name="gpa"
                defaultValue={student.gpa}
              />
              <Form.Control.Feedback type="valid">
                Optional
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="position-relative mb-3">
              <Form.Label>Upload Student Image</Form.Label>
              <Form.Control
                name="image"
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              ></Form.Control>
              <Form.Control.Feedback type="valid">
                Optional
              </Form.Control.Feedback>
            </Form.Group>
            Campus
            <Form.Select onChange={handleSelect}>
              {campus ? (
                <>
                  <option key={campus.id} value={campus}>
                    {campus.name}
                  </option>
                  {allCampuses
                    .filter((item) => item.id !== campus.id)
                    .map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                </>
              ) : (
                <>
                  <option>Select campus</option>{" "}
                  {allCampuses.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </>
              )}
            </Form.Select>
          </Row>
          <div className="formButton">
            <Button onClick={cancel} style={{ margin: "20px" }}>
              Cancel
            </Button>
            <Button type="submit">Edit Student</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditStudent;
