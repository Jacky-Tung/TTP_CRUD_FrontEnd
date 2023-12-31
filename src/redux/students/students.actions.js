import axios from "axios";

import StudentsActionType from "./students.types";

export const fetchAllStudents = (payload) => ({
  type: StudentsActionType.FETCH_ALL_STUDENTS,
  payload,
});

export const fetchAllStudentsThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_VERCEL_URL}api/students`
      );
      console.log("REDUX THUNK API CALL AllStudents===>", response.data);
      dispatch(fetchAllStudents(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchStudent = (payload) => ({
  type: StudentsActionType.FETCH_STUDENT,
  payload,
});

export const fetchStudentThunk = (pk) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_VERCEL_URL}api/students/single?pk=${pk}`
      );
      console.log("REDUX THUNK API CALL Student===>", response.data);
      dispatch(fetchStudent(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchStudentCount = (payload) => ({
  type: StudentsActionType.FETCH_STUDENT_COUNT,
  payload,
});

export const fetchStudentCountThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_VERCEL_URL}api/students/count`
      );
      console.log("REDUX THUNK API CALL StudentCount===>", response.data);
      dispatch(fetchStudentCount(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addStudent = (payload) => ({
  type: StudentsActionType.ADD_STUDENT,
  payload,
});

export const addStudentThunk = (firstName, lastName, email, gpa, imageUrl) => {
  return async (dispatch) => {
    try {
      let response = "";
      imageUrl
        ? (response = await axios.post(
            `${process.env.REACT_APP_VERCEL_URL}api/students?firstName=${firstName}&lastName=${lastName}&email=${email}&gpa=${gpa}&imageUrl=${imageUrl}`
          ))
        : (response = await axios.post(
            `${process.env.REACT_APP_VERCEL_URL}api/students?firstName=${firstName}&lastName=${lastName}&email=${email}&gpa=${gpa}`
          ));
      console.log("REDUX THUNK API CALL AddStudent===>", response.data);
      dispatch(addStudent(response.data));
      dispatch(fetchAllStudentsThunk());
      dispatch(fetchStudentCountThunk());
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeStudent = () => ({
  type: StudentsActionType.REMOVE_STUDENT,
});

export const removeStudentThunk = (pk) => {
  return async (dispatch) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_VERCEL_URL}api/students?pk=${pk}`
      );
      dispatch(removeStudent());
      dispatch(fetchAllStudentsThunk());
      dispatch(fetchStudentCountThunk());
    } catch (error) {
      console.error(error);
    }
  };
};

export const editStudent = () => ({
  type: StudentsActionType.EDIT_STUDENT,
});

export const editStudentThunk = (
  firstName,
  lastName,
  email,
  gpa,
  imageUrl,
  pk,
  campusId
) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_VERCEL_URL}api/students?firstName=${firstName}&lastName=${lastName}&email=${email}&imageUrl=${imageUrl}&gpa=${gpa}&pk=${pk}&campusId=${campusId}`
      );
      console.log("REDUX THUNK API CALL EditStudent===>", response.data);
      dispatch(fetchAllStudentsThunk());
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeStudentFromCampus = () => ({
  type: StudentsActionType.REMOVE_STUDENT_FROM_CAMPUS,
});

export const removeStudentFromCampusThunk = (
  firstName,
  lastName,
  email,
  gpa,
  imageUrl,
  pk
) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_VERCEL_URL}api/students/remove?firstName=${firstName}&lastName=${lastName}&email=${email}&imageUrl=${imageUrl}&gpa=${gpa}&pk=${pk}`
      );
      console.log(
        "REDUX THUNK API CALL RemoveStudentFromCampus===>",
        response.data
      );
      dispatch(fetchAllStudentsThunk());
    } catch (error) {
      console.error(error);
    }
  };
};

export const addStudentToCampus = () => ({
  type: StudentsActionType.ADD_STUDENT_TO_CAMPUS,
});

export const addStudentToCampusThunk = (pk, campusId) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_VERCEL_URL}api/students/add?pk=${pk}&campusId=${campusId}`
      );
      console.log("REDUX THUNK API CALL AddStudentToCampus===>", response.data);
      dispatch(fetchAllStudentsThunk());
    } catch (error) {
      console.error(error);
    }
  };
};
