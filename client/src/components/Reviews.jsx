import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  return (
    <div className="row row-cols-3 mb-2">
      {reviews.map((review) => {
        return (
          <div
            key={review.id}
            className="card text-black mb-3 mr-4"
            style={{
              maxWidth: "30%",
              backgroundColor: "#ffffff",
              borderRadius: 10,
              width: "30%",
            }}
          >
            <div
              style={{ backgroundColor: "#9AC1E5", borderRadius: 10 }}
              className="card-header d-flex align-items-center justify-content-around"
            >
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} color={"#337EC4"} />
              </span>
            </div>
            <div className="card-body">
              <div className="card-text">{review.review}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
