import StudentsActionType from "./students.types";

export const INITIAL_STUDENTS_STATE = {
  allStudents: [],
  student: {},
  count: 0,
};

const studentsReducer = (state = INITIAL_STUDENTS_STATE, action) => {
  switch (action.type) {
    case StudentsActionType.FETCH_ALL_STUDENTS:
      return { ...state, allStudents: action.payload };

    case StudentsActionType.FETCH_STUDENT:
      return { ...state, student: action.payload };

    case StudentsActionType.FETCH_STUDENT_COUNT:
      return { ...state, count: action.payload };

    default:
      return state;
  }
};

export default studentsReducer;
