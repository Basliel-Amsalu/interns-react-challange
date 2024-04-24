import React from "react";
import ActorCard from "../ActorCard/ActorCard";

const ActorList = ({ actors, onDetailClick }) => {
  return (
    <div className='actor-list'>
      {actors &&
        actors.map((actor) => (
          <ActorCard actor={actor.fields} onDetailClick={onDetailClick} />
        ))}
    </div>
  );
};

export default ActorList;
