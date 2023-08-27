import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [accountData, setAccountData] = useState({});

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
        accountData,
        setAccountData,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
