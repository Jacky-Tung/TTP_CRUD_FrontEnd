import React from "react";
import { Button, Image, Col, Card, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeStudentThunk } from "../redux/students/students.actions";

const ListStudents = (props) => {
  const { list } = props;
  const dispatch = useDispatch();

  return (
    <Container fluid>
      {list ? (
        <div className="list">
          {list.length > 0 ? (
            list.map((item) => {
              return (
                <Col>
                  <Card
                    key={item.id}
                    style={{ width: "202px", height: "290px" }}
                  >
                    <Image
                      src={item.imageUrl}
                      style={{ width: "200px", height: "175px" }}
                    ></Image>
                    <Card.Body>
                      <Card.Title>
                        <Link to={`/students/${item.id}`}>{item.firstName} {item.lastName}</Link>
                        <Button
                          onClick={() => {
                            return dispatch(removeStudentThunk(item.id));
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
            })
          ) : (
            <h1 className="header">There are no students registered.</h1>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </Container>
  );
};

export default ListStudents;
