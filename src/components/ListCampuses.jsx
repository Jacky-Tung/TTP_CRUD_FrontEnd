import { Button, Card, Image, Col, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeCampusThunk } from "../redux/campuses/campuses.actions";

const ListCampuses = ({ list }) => {
  const dispatch = useDispatch();
  console.log(list)
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
                        <Link to={`/campuses/${item.id}`}>{item.name}</Link>
                        <Button
                          onClick={() => {
                            return dispatch(removeCampusThunk(item.id));
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
            <h1 className="header">There are no campuses registered.</h1>
          )}
        </div>
      ) : (
        <h1 className="header">Loading...</h1>
      )}
    </Container>
  );
};

export default ListCampuses;
