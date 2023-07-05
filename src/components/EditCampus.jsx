import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCampusThunk,
  fetchAllCampusesThunk,
  fetchCampusThunk,
} from "../redux/campuses/campuses.actions";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

const EditCampus = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const nav = useNavigate();
  const { campus } = useSelector((state) => state.campuses.campus);
  const [fetchingCampuses, setFetchingCampuses] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { campusId } = useParams();

  const fetchCampus = () => {
    return dispatch(fetchCampusThunk(campusId));
  };

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
      editCampus(
        form.campusName.value,
        form.campusAddress.value,
        form.description.value
      );
      event.preventDefault();
    }
    setValidated(true);
  };

  const editCampus = (name, address, description) => {
    dispatch(
      editCampusThunk(name, address, description, selectedImage, campusId)
    )
      .then(() => {
        setFetchingCampuses(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchCampus();
    setSelectedImage(campus.imageUrl);
    if (fetchingCampuses) {
      dispatch(fetchAllCampusesThunk())
        .then(() => {
          nav(`/campuses/${campusId}`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch, fetchingCampuses, nav, campusId]);

  const cancel = () => {
    nav(`/campuses/${campusId}`);
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Campus Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="campus name"
              defaultValue={campus.name}
              name="campusName"
            />
            <Form.Control.Feedback type="invalid">
              Please edit campus name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="address"
              defaultValue={campus.address}
              name="campusAddress"
            />
            <Form.Control.Feedback type="invalid">
              Please edit campus address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              defaultValue={campus.description}
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
            ></Form.Control>
            <Form.Control.Feedback type="valid">Optional</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Edit Campus</Button>
        <Button onClick={cancel}>Cancel</Button>
      </Form>
    </div>
  );
};

export default EditCampus;
