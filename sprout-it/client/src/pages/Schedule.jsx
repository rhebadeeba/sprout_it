import React from "react";
import "./Schedule.css";
import SproutLogo from "../assets/sprout-logo.png"
import PlantCard from "../components/PlantCard";
import Navbar from "../components/NavBar";
import Calendar from "../components/Calendar";

const Schedule = () => {
  return (
    <div className="schedule">
      <Navbar />
      <img className="logo" src={SproutLogo} />
      <h1>Schedule</h1>
      <Calendar/>
      <div>
        <PlantCard></PlantCard>
      </div>
    </div>
  );
};

export default Schedule;
