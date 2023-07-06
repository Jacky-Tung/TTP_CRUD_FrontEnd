import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCampusThunk } from "../redux/campuses/campuses.actions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Image, Form } from "react-bootstrap";
import {
  removeStudentFromCampusThunk,
  fetchAllStudentsThunk,
  addStudentToCampusThunk,
} from "../redux/students/students.actions";

const Campus = () => {
  const { campus, students } = useSelector((state) => state.campuses.campus);
  const allStudents = useSelector((state) => state.students.allStudents);
  console.log("campus", campus);
  console.log("students", students);
  const { campusId } = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [studentId, setStudentId] = useState("");

  const fetchCampus = () => {
    return dispatch(fetchCampusThunk(campusId));
  };

  const fetchAllStudents = () => {
    return dispatch(fetchAllStudentsThunk());
  };

  useEffect(() => {
    fetchCampus();
    fetchAllStudents();
  }, [students]);

  const editCampus = () => {
    return nav(`/editCampus/${campusId}`);
  };

  const handleSelect = (event) => {
    setStudentId(event.target.value);
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
      <Form.Select onChange={handleSelect} value={studentId}>
        <option value=''>Select Student</option>
        {allStudents &&
          allStudents
            .filter((student) => !student.campusId)
            .map((student) => (
              <option value={student.id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
      </Form.Select>
      <Button
        onClick={() => {
          return dispatch(addStudentToCampusThunk(studentId, campusId));
        }}
      >
        Add Student To Campus
      </Button>
      {students && students.length > 0 ? (
        <div>
          {students.map((student) => {
            return (
              <div key={student.id}>
                <h3>
                  <Link to={`/students/${student.id}`}>
                    {student.firstName} {student.lastName}
                  </Link>
                  <Button
                    onClick={() => {
                      return dispatch(
                        removeStudentFromCampusThunk(
                          student.firstName,
                          student.lastName,
                          student.email,
                          student.gpa,
                          student.imageUrl,
                          student.id
                        )
                      );
                    }}
                  >
                    Remove
                  </Button>
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
