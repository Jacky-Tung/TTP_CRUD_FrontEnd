import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeStudentThunk } from "../redux/students/students.actions";

const ListStudents = (props) => {
  const { list } = props;
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
                      <Link to={`/students/${item.id}`}>
                        {item.firstName} {item.lastName}
                      </Link>
                      <Button
                        onClick={() => {
                          return dispatch(removeStudentThunk(item.id));
                        }}
                      >
                        Remove
                      </Button>
                    </h1>
                  </div>
                );
              })}
            </div>
          ) : (
            <h1>There are no students registered.</h1>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ListStudents;
