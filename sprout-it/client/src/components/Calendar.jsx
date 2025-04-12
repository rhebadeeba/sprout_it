import React, { useState, useEffect } from "react";
import "./Calendar.css"

const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];

  const firstDay = date.getDay();

  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let i = 1; i <= totalDays; i++) {
    days.push(i);
  }

  return days;
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [wateringEvents, setWateringEvents] = useState([])

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await fetch("http://localhost:5173/api/user_plants");
        const data = await res.json();

        const today = new Date();
        const events = [];

        data.forEach((plant) => {
          const freq = plant.water_freq;
          const name = plant.plant_name;

          if (!freq) return;

          // Generate next 5 watering dates
          for (let i = 0; i < 5; i++) {
            const eventDate = new Date(today);
            eventDate.setDate(today.getDate() + i * freq);
            events.push({
              date: eventDate,
              plant: name,
            });
          }
        });

        setWateringEvents(events);
      } catch (err) {
        console.error("Failed to fetch plant data:", err);
      }
    };

    fetchPlants();
  }, []);


  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1)); // Go to the previous month
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1)); // Go to the next month
  };

  const isWateringDay = (day) => {
    if (!day) return null;

    return wateringEvents.filter((event) => {
      return (
        event.date.getFullYear() === year &&
        event.date.getMonth() === month &&
        event.date.getDate() === day
      );
    });
  };

  return (
    <div>
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Previous</button>
        <h2>{`${currentDate.toLocaleString("default", {
          month: "long",
        })} ${year}`}</h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="calendar-day-name">
            {day}
          </div>
        ))}
        {daysInMonth.map((day, index) => {
          const events = isWateringDay(day);

          return (
            <div key={index} className={`calendar-day ${day ? "" : "empty"}`}>
              <div className="day-number">{day || ""}</div>
              {events && events.length > 0 && (
                <div className="watering-events">
                  {events.map((e, i) => (
                    <span key={i} className="watering-dot" title={`Water ${e.plant}`}>
                      💧
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
