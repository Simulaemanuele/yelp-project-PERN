import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    i <= rating
      ? stars.push(<i className="fas fa-star text-warning"></i>)
      : i === Math.ceil(rating) && !Number.isInteger(rating)
      ? stars.push(<i className="fas fa-star-half-alt text-warning"></i>)
      : stars.push(<i className="far fa-star text-warning"></i>);
  }

  return <>{stars}</>;
};

export default StarRating;
