import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeCampusThunk } from "../redux/campuses/campuses.actions";

const ListCampuses = ({ list }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {list ? (
        <div>
          {list.length > 0 ? (
            <div>
              {list.map((item) => {
                return (
                  <div key={item.id}>
                    <h1>
                      <Link to={`/campuses/${item.id}`}>{item.name}</Link>
                      <Button
                        onClick={() => {
                          return dispatch(removeCampusThunk(item.id));
                        }}
                      >
                        Remove
                      </Button>
                    </h1>
                    <Image src={item.imageUrl}></Image>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>There are no campuses registered.</h1>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ListCampuses;
