import { combineReducers } from "redux";
import campusesReducer from "./campuses/campuses.reducer";
import studentsReducer from "./students/students.reducer";

const rootReducer = combineReducers({
  campuses: campusesReducer,
  students: studentsReducer
});

export default rootReducer;
