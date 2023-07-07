import axios from "axios";

import CampusesActionType from "./campuses.types";

export const fetchAllCampuses = (payload) => ({
  type: CampusesActionType.FETCH_ALL_CAMPUSES,
  payload,
});

export const fetchAllCampusesThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${process.env.VERCEL_URL}api/campuses`);
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
        `${process.env.VERCEL_URL}api/campuses/single?pk=${pk}`
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
      const response = await axios.get(
        `${process.env.VERCEL_URL}api/campuses/count`
      );
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

export const addCampusThunk = (name, address, description, imageUrl) => {
  return async (dispatch) => {
    try {
      let response = "";
      imageUrl
        ? (response = await axios.post(
            `${process.env.VERCEL_URL}api/campuses?name=${name}&address=${address}&description=${description}&imageUrl=${imageUrl}`
          ))
        : (response = await axios.post(
            `${process.env.VERCEL_URL}api/campuses?name=${name}&address=${address}&description=${description}`
          ));
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
      await axios.delete(`${process.env.VERCEL_URL}api/campuses?pk=${pk}`);
      dispatch(removeCampus());
      dispatch(fetchAllCampusesThunk());
      dispatch(fetchCampusCountThunk());
    } catch (error) {
      console.error(error);
    }
  };
};

export const editCampus = () => ({
  type: CampusesActionType.EDIT_CAMPUS,
});

export const editCampusThunk = (name, address, description, imageUrl, pk) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${process.env.VERCEL_URL}api/campuses?name=${name}&address=${address}&description=${description}&imageUrl=${imageUrl}&pk=${pk}`
      );
      console.log("REDUX THUNK API CALL EditCampus===>", response.data);
      dispatch(fetchAllCampusesThunk());
    } catch (error) {
      console.error(error);
    }
  };
};
