// App.js
import React, { useState, useEffect } from "react";
import ActorsList from "./components/ActorsList/ActorsList";
import axios from "axios";
// import ActorDetails from './ActorDetails';

const App = () => {
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActors();
    console.log("hello");
  }, []);

  const fetchActors = async () => {
    try {
      const response = await axios.get("https://swapi-node.now.sh/api/people");
      console.log(response.data.results);

      // const data = await response.json();
      setActors(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching actors:", error);
      setError(error);
      setLoading(false);
    }
  };

  const handleDetailClick = (actor) => {
    setSelectedActor(actor);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <>
          <h1>Star Wars Actors</h1>
          <ActorsList actors={actors} onDetailClick={handleDetailClick} />
          {/* {selectedActor && <ActorDetails actor={selectedActor} />} */}
        </>
      )}
    </div>
  );
};

export default App;
