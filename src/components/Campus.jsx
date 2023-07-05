import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampusThunk } from "../redux/campuses/campuses.actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";

const Campus = () => {
  const { campus, students } = useSelector((state) => state.campuses.campus);
  console.log("campus", campus);
  console.log("students", students);
  const { campusId } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const fetchCampus = () => {
    return dispatch(fetchCampusThunk(campusId));
  };

  useEffect(() => {
    fetchCampus();
  }, []);

  const editCampus = () => {
    return nav(`/editCampus/${campusId}`);
  };

  return (
    <div>
      {campus ? (
        <div key={campus.id}>
          <h1>{campus.name}</h1>
          <Image src={campus.imageUrl}></Image>
          <h2>{campus.address}</h2>
          <h2>{campus.description}</h2>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
      <Button onClick={editCampus}>Edit Campus</Button>
      <h1>Students on campus</h1>
      {students && students.length > 0 ? (
        <div>
          {students.map((student) => {
            return (
              <div key={student.id}>
                <h3>
                  <Link to={`/students/${student.id}`}>
                    {student.firstName} {student.lastName}
                  </Link>
                </h3>
              </div>
            );
          })}
        </div>
      ) : (
        <h5>There are no students currently registered to this campus.</h5>
      )}
    </div>
  );
};

export default Campus;

/** Rendering
- [ ] Write a component to display a single campus with the following information:
- [ ] The campus's name, image, address and description
- [ ] A list of the names of all students in that campus (or a helpful message if it doesn't have any students) 
 */

/** Router (sending clicked on campus' id to thunk 
 * in order to update the store by retrieving data
 *  from db for the clicked on campus)
- [ ] Display the appropriate campus's info when the url matches `/campuses/:campusId`
- [ ] Clicking on a campus from the all-campuses view should navigate to show that campus in the single-campus view
 */
