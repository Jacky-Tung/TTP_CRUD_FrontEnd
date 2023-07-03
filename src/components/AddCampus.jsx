import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCampusThunk,
  fetchAllCampusesThunk,
} from "../redux/campuses/campuses.actions";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddCampus = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const nav = useNavigate();
  const allCampuses = useSelector((state) => state.campuses.allCampuses);
  const [fetchingCampuses, setFetchingCampuses] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      addCampus(form.campusName.value, form.campusAddress.value, form.description.value);
      event.preventDefault();
    }
    setValidated(true);
  };

  const addCampus = (name, address, description) => {
    dispatch(addCampusThunk(name, address, description, selectedImage))
      .then(() => {
        setFetchingCampuses(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (fetchingCampuses) {
      dispatch(fetchAllCampusesThunk())
        .then(() => {
          nav(`/campuses/${allCampuses[allCampuses.length - 1].id}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, fetchingCampuses, allCampuses, nav]);

  const cancel = () => {
    nav(`/campuses`);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Campus Name*</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="campus name"
              defaultValue=""
              name="campusName"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a campus name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Address*</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="address"
              defaultValue=""
              name="campusAddress"
            />
            <Form.Control.Feedback type="invalid">
              Please enter an address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              defaultValue=""
              name="description"
            />
            <Form.Control.Feedback type="valid">Optional</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Upload Campus Image</Form.Label>
            <Form.Control
              name="image"
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              defaultValue={null}
            ></Form.Control>
          </Form.Group>
        </Row>
        <Button type="submit">Add Campus</Button>
        <Button onClick={cancel}>Cancel</Button>
      </Form>
    </div>
  );
};

export default AddCampus;
