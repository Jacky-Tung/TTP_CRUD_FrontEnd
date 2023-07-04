import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudentThunk,
  fetchAllStudentsThunk,
} from "../redux/students/students.actions";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddStudent = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const nav = useNavigate();
  const allStudents = useSelector((state) => state.students.allStudents);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
      addStudent(form.firstName.value, form.lastName.value, form.email.value, form.gpa.value);
      event.preventDefault();
    }
    setValidated(true);
  };

  const addStudent = (firstName, lastName, email, gpa) => {
    dispatch(
      addStudentThunk(
        firstName,
        lastName,
        email,
        gpa,
        selectedImage,
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
    if (fetchingStudents) {
      dispatch(fetchAllStudentsThunk())
        .then(() => {
          nav(`/students/${allStudents[allStudents.length - 1].id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, fetchingStudents, allStudents, nav]);

  const cancel = () => {
    nav(`/students`);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="first name"
              defaultValue=""
              name="firstName"
            />
            <Form.Control.Feedback type="invalid">
              Please enter student first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="last name"
              defaultValue=""
              name="lastName"
            />
            <Form.Control.Feedback type="invalid">
              Please enter student last name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="email"
              defaultValue=""
              name="email"
            />
            <Form.Control.Feedback type="invalid">
              Please enter student email.
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
              defaultValue={null}
            />
            <Form.Control.Feedback type="valid">Optional</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Upload Student Image</Form.Label>
            <Form.Control
              name="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              defaultValue={null}
            ></Form.Control>
            <Form.Control.Feedback type="valid">Optional</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Add Student</Button>
        <Button onClick={cancel}>Cancel</Button>
      </Form>
    </div>
  );
};

export default AddStudent;
