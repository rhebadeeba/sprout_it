import React from "react";
import "./HomePage.css";
import SproutLogo from "../assets/sprout-logo.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const goToSchedule = () => {
    navigate('/schedule');
  };

  return (
    <div className="home-page">
      <h1>Sprout It!</h1>
      <img className="sprout-img" src={SproutLogo} />
      <br></br>
      <button onClick={goToSchedule} className="button">Click here to start!</button>
    </div>
  );
};

export default HomePage;
