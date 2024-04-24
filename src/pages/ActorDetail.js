import React from "react";
import ReactDOM from "react-dom";
import "./ActorDetail.css";

const ActorDetail = ({ actor, closeModal }) => {
  const portalElement = document.getElementById("modal-root");
  return (
    <>
      {ReactDOM.createPortal(
        <div className='modal-backdrop' onClick={closeModal}></div>,
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
              <p>Height: {actor.height}</p>
              <p>Birth Year: {actor.birth_year}</p>
              {/* Add more details here */}
            </div>
          </div>
        </div>,
        portalElement
      )}
    </>
  );
};

export default ActorDetail;
