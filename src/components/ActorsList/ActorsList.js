import React from "react";

const ActorList = ({ actors, onDetailClick }) => {
  return (
    <div className='actor-list'>
      {actors.map((actor) => (
        <ActorList actor={actor} onDetailClick={onDetailClick} />
      ))}
    </div>
  );
};

export default ActorList;
