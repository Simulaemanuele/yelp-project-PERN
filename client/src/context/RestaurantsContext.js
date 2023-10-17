import React, { useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [accountData, setAccountData] = useState({});
  const [userData, setUserData] = useState();

  const addRestaurants = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  const localStorageSave = (data) => {
    localStorage.setItem("data", data);
  };
  const localStorageGet = () => {
    localStorage.getItem("data");
  };

  // RESTART FROM HERE

  const handleSetRestaurants = (restaurants) => {
    if (restaurants !== undefined) {
      setRestaurants();
    } else {
    }
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
        localStorageSave,
        localStorageGet,
        userData,
        setUserData,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
