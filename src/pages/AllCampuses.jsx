import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCampusesThunk } from "../redux/campuses/campuses.actions";
import ListCampuses from "../components/ListCampuses";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// List all campuses
const Campuses = () => {
  const allCampuses = useSelector((state) => state.campuses.allCampuses);
  console.log(allCampuses);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const navToForm = () => {
    return nav(`/addCampus`);
  };

  useEffect(() => {
    dispatch(fetchAllCampusesThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="header">
        <h1>All Campuses</h1>
        <Button onClick={navToForm}>Add Campus</Button>
      </div>
      <ListCampuses list={allCampuses} />
    </div>
  );
};

export default Campuses;
