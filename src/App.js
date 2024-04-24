// App.js
import React, { useState, useEffect } from "react";
import ActorsList from "./components/ActorsList/ActorsList";
import axios from "axios";
import ActorDetail from "./pages/ActorDetail";
// import ActorDetails from './ActorDetails';

const App = () => {
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(
    "https://swapi-node.now.sh/api/people/?page=1"
  );

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data.results);

        // const data = await response.json();
        setActors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actors:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchActors();
    console.log("hello");
  }, [url]);

  const handleDetailClick = (actor) => {
    setSelectedActor(actor);
    setModalOpen(true);
  };

  const closeDetails = () => {
    setSelectedActor(null);
    setModalOpen(false);
  };

  const nextPlanetPage = () => {
    setLoading(true);
    setUrl(`https://swapi-node.now.sh${actors.next}`);
  };

  const previousPage = () => {
    setLoading(true);
    setUrl(`https://swapi-node.now.sh${actors.previous}`);
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <main>
          <h1>Star Wars Actors</h1>
          <ActorsList
            actors={actors.results}
            onDetailClick={handleDetailClick}
          />
          <button
            onClick={previousPage}
            disabled={actors.previous ? false : true}
          >
            Previous Page
          </button>
          <button
            onClick={nextPlanetPage}
            disabled={actors.next ? false : true}
          >
            Next Page
          </button>
          {selectedActor && (
            <ActorDetail
              actor={selectedActor}
              closeModal={closeDetails}
              onDetailClick={handleDetailClick}
            />
          )}
        </main>
      )}
    </div>
  );
};

export default App;
