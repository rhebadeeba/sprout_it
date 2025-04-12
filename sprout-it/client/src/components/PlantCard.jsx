import React, { useEffect, useState } from "react";
import axios from "axios";

const PlantCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://perenual.com/api/v2/species-list?key=sk-Yl4b67fab3550d5099751&q=European`
        );
        setData(response.data);
        console.log(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  // <pre>{JSON.stringify(data, null, 2)}</pre>

  return (
    <div className="plantcard">
      {data &&
        data.map((item) => (
          <div>
            <h2 key={item.id}>{item.title}</h2> 
            <p>{item.common_name}</p>
          </div>
        ))}
    </div>
  );
};

export default PlantCard;
