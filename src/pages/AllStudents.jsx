import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllStudentsThunk } from "../redux/students/students.actions";
import ListStudents from "../components/ListStudents";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

// List all students
const Students = () => {
  const allStudents = useSelector((state) => state.students.allStudents);
  console.log(allStudents);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const navToForm = () => {
    return nav("/addStudent");
  };

  useEffect(() => {
    dispatch(fetchAllStudentsThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="header">
        <h1>All Students</h1>
        <Button onClick={navToForm}>Add Student</Button>
      </div>
      <ListStudents list={allStudents}></ListStudents>
    </div>
  );
};

export default Students;
