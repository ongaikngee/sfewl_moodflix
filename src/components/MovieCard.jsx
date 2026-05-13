import React from "react";

const MovieCard = ({ movie: { id, name, flag } }) => {
  return (
    <div className="movie-card">
      <img src={flag ? "/no-movie.png" : "/no-movie.png"} />

      <div className="mt-4">
        <h3>{name.common}</h3>

        <div className="hover-content">
          <div className="rating">
            <p>{flag}</p>
          </div>
          <span>.</span>
          <p className="lang">En</p>
          <span>.</span>
          <p className="year">2021</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
