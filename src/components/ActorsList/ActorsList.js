import React from "react";
import ActorCard from "../ActorCard/ActorCard";
import "./ActorsList.css";

const ActorList = ({ actors, onDetailClick }) => {
  return (
    <div className='actor-list'>
      {actors &&
        actors.map((actor) => (
          <ActorCard
            key={actor.fields.name}
            actor={actor.fields}
            onDetailClick={onDetailClick}
          />
        ))}
    </div>
  );
};

export default ActorList;
