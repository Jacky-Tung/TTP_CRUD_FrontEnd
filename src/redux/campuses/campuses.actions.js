import axios from "axios";

import CampusesActionType from "./campuses.types";

export const fetchAllCampuses = (payload) => ({
  type: CampusesActionType.FETCH_ALL_CAMPUSES,
  payload,
});

export const fetchAllCampusesThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/campuses`);
      console.log("REDUX THUNK API CALL AllCampuses===>", response.data);
      dispatch(fetchAllCampuses(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchCampus = (payload) => ({
  type: CampusesActionType.FETCH_CAMPUS,
  payload,
});

export const fetchCampusThunk = (pk) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/campuses/single?pk=${pk}`
      );
      console.log("REDUX THUNK API CALL Campus===>", response.data);
      dispatch(fetchCampus(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchCampusCount = (payload) => ({
  type: CampusesActionType.FETCH_CAMPUS_COUNT,
  payload,
});

export const fetchCampusCountThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/campuses/count`);
      console.log("REDUX THUNK API CALL CampusCount===>", response.data);
      dispatch(fetchCampusCount(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addCampus = (payload) => ({
  type: CampusesActionType.ADD_CAMPUS,
  payload,
});

export const addCampusThunk = (name, address) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/campuses?name=${name}&address=${address}`
      );
      console.log("REDUX THUNK API CALL AddCampus===>", response.data);
      dispatch(addCampus(response.data));
      dispatch(fetchAllCampusesThunk());
      dispatch(fetchCampusCountThunk());
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeCampus = () => ({
  type: CampusesActionType.REMOVE_CAMPUS,
});

export const removeCampusThunk = (pk) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:8080/api/campuses?pk=${pk}`);
      dispatch(removeCampus());
      dispatch(fetchAllCampusesThunk());
      dispatch(fetchCampusCountThunk());
    } catch (error) {
      console.error(error);
    }
  };
};
