import CampusesActionType from "./campuses.types";

export const INITIAL_CAMPUSES_STATE = {
  allCampuses: [],
  campus: {},
  count: 0,
};

const campusesReducer = (state = INITIAL_CAMPUSES_STATE, action) => {
  switch (action.type) {
    case CampusesActionType.FETCH_ALL_CAMPUSES:
      return { ...state, allCampuses: action.payload };

    case CampusesActionType.FETCH_CAMPUS:
      return { ...state, campus: action.payload };

    case CampusesActionType.FETCH_CAMPUS_COUNT:
      return { ...state, count: action.payload };

    case CampusesActionType.ADD_CAMPUS:
      return { ...state, allCampuses: [...state.allCampuses, action.payload] };
      
    default:
      return state;
  }
};

export default campusesReducer;
