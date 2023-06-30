import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCampusThunk } from "../redux/campuses/campuses.actions";
import { useNavigate } from "react-router-dom";
import { Form, Row, Col, Button } from "react-bootstrap";

const AddCampus = () => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const nav = useNavigate();
  const recentAddedCampus = useSelector(
    (state) => state.campuses.addedCampus
  );

  const navToNewCampus = () => {
    // return nav(`/campuses/${recentAddedCampus.id}`);
    return nav(`/campuses`);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else{
        addCampus(form.campusName.value, form.campusAddress.value).then()
        navToNewCampus();
    }

    setValidated(true);
  };

  const addCampus = (name, address) => {
    return dispatch(addCampusThunk(name, address));
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
              defaultValue=""
              name="campusName"
            />
            <Form.Control.Feedback type="invalid">Please enter a campus name.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="address"
              defaultValue=""
              name="campusAddress"
            />
            <Form.Control.Feedback type="invalid">Please enter an address.</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Add Campus</Button>
      </Form>
    </div>
  );
};

export default AddCampus;
