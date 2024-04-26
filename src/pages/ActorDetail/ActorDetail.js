import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./ActorDetail.css";

const ActorDetail = ({ actor, closeModal }) => {
  const [films, setFilms] = useState({
    results: [],
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const response = await fetch("https://swapi-node.now.sh/api/films");
        const data = await response.json();
        console.log(data);
        setFilms(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching actors:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchActors();
  }, []);

  const filmsWithActor = films.results.filter((film) =>
    film.fields.characters.includes(actor.url)
  );

  console.log(filmsWithActor);

  const portalElement = document.getElementById("modal-root");
  return (
    <>
      {ReactDOM.createPortal(
        <div
          data-testid='modal-backdrop'
          className='modal-backdrop'
          onClick={closeModal}
        ></div>,
        portalElement
      )}
      {ReactDOM.createPortal(
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-content'>
              <span className='close' onClick={closeModal}>
                &times;
              </span>
              <h2>{actor.name}</h2>
              <div className='detail-container'>
                <div className='detail'>
                  <h3>Detail about the {actor.name}</h3>
                  <p>Height: {actor.height}</p>
                  <p>Birth Year: {actor.birth_year}</p>
                  <p> Gender: {actor.gender}</p>
                  <p>Skin color: {actor.skin_color}</p>
                  <p>Hair color: {actor.hair_color}</p>
                  <p>Eye color: {actor.eye_color}</p>
                  <p>Mass: {actor.mass}</p>
                </div>
                <div className='films'>
                  <h3>Films {actor.name} has been in:</h3>
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error: {error.message}</p>
                  ) : (
                    <ul>
                      {filmsWithActor.map((film) => (
                        <p key={film.fields.title}>{film.fields.title}</p>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default ActorDetail;
