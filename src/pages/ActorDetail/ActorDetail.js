import React from "react";
import ReactDOM from "react-dom";
import "./ActorDetail.css";

const ActorDetail = ({ actor, closeModal }) => {
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
              <div>
                <h2>{actor.name}</h2>
                <p>Height: {actor.height}</p>
                <p>Birth Year: {actor.birth_year}</p>
              </div>
              <div>
                <p> Gender: {actor.gender}</p>
                <p>Skin color: {actor.skin_color}</p>
                <p>Hair color: {actor.hair_color}</p>
                <p>Eye color: {actor.eye_color}</p>
                <p>Mass: {actor.mass}</p>
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
