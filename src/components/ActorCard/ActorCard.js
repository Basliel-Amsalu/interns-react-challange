import React from "react";

const ActorCard = ({ actor, onDetailClick }) => {
  return (
    <div key={actor.name} className='actor-card'>
      <h2>{actor.name}</h2>
      <p>Height: {actor.height}</p>
      <p>Birth Year: {actor.birth_year}</p>
      <button onClick={() => onDetailClick(actor)}>Detail</button>
    </div>
  );
};

export default ActorCard;
