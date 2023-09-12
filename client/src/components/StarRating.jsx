import React from "react";

const StarRating = ({ rating, color }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    i <= rating
      ? stars.push(
          <i key={i} style={{ color: color }} className="fas fa-star"></i>
        )
      : i === Math.ceil(rating) && !Number.isInteger(rating)
      ? stars.push(
          <i
            key={i}
            style={{ color: color }}
            className="fas fa-star-half-alt"
          ></i>
        )
      : stars.push(
          <i key={i} style={{ color: color }} className="far fa-star"></i>
        );
  }

  return <>{stars}</>;
};

export default StarRating;
