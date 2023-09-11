import React, { useContext } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";

const ListEditRestaurants = () => {
  const { restaurants } = useContext(RestaurantsContext);

  return (
    <div style={{ height: "100vh" }}>
      {restaurants && restaurants.length > 0 ? (
        restaurants.map((restaurant) => {
          return (
            <div key={restaurant.name + Math.random()}>{restaurant.name}</div>
          );
        })
      ) : (
        <div>No restaurants to view!</div>
      )}
    </div>
  );
};

export default ListEditRestaurants;
