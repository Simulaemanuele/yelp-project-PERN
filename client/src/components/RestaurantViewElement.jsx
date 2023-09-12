import React from "react";
import StarRating from "./StarRating";
import ImageElement from "./ImageElement";

function RestaurantViewElement({ restaurant }) {
  console.log("RestaurantViewElement: ", restaurant);
  return (
    <div
      style={{
        borderRadius: 25,
        boxShadow: "0px 0px 10px #007BFF",
        paddingTop: 12.5,
        paddingBottom: 12.5,
        justifyContent: "space-evenly",
        width: "100%",
      }}
      className="bg-dark d-flex align-items-center"
    >
      <div style={{ objectFit: "cover" }}>
        <ImageElement />
      </div>
      <div>
        <div className="text-white">{restaurant?.name}</div>
        <div className="text-white">{restaurant?.location}</div>
        <div className="text-white">{"$".repeat(restaurant?.price_range)}</div>
        <div className="text-white">
          <StarRating rating={restaurant?.avarage_rating} />
        </div>
      </div>
    </div>
  );
}

export default RestaurantViewElement;
