// App.js
import React, { useState, useEffect } from "react";
import ActorsList from "./components/ActorsList/ActorsList";
import ActorDetail from "./pages/ActorDetail";
import "./App.css";

const App = () => {
  const [actors, setActors] = useState({
    results: [],
    next: null,
    previous: null,
  });
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
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        setActors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actors:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchActors();
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
        <>
          <div className='loading'>Loading...</div>
          {/* <button onClick={previousPage} disabled={!actors.previous}>
            Previous Page
          </button>
          <button onClick={nextPlanetPage} disabled={!actors.next}>
            Next Page
          </button> */}
        </>
      ) : error ? (
        <>
          <div className='error'>Error: {error.message}</div>
          {/* <button onClick={previousPage} disabled={!actors.previous}>
            Previous Page
          </button>
          <button onClick={nextPlanetPage} disabled={!actors.next}>
            Next Page
          </button> */}
        </>
      ) : (
        <main>
          <div className='title'>
            <h1 data-testid='characters-list'>Star Wars Characters</h1>
          </div>
          <div className='list'>
            <ActorsList
              actors={actors.results}
              onDetailClick={handleDetailClick}
            />
            <div className='nav-btn'>
              {actors.previous && (
                <button onClick={previousPage}>Previous Page</button>
              )}
              {actors.next && (
                <button onClick={nextPlanetPage}>Next Page</button>
              )}
            </div>
          </div>
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
