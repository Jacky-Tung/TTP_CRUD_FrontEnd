import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudentThunk } from "../redux/students/students.actions";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddStudent = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const nav = useNavigate();

  const navToStudents = () => {
    return nav("/students");
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      addStudent(form.firstName.value, form.lastName.value, form.email.value);
      navToStudents();
    }

    setValidated(true);
  };

  const addStudent = (firstName, lastName, email) => {
    return dispatch(addStudentThunk(firstName, lastName, email));
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
        </Row>
        <Button type="submit">Add Student</Button>
      </Form>
    </div>
  );
};

export default AddStudent;
