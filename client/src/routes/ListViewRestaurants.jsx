import React, { useContext, useState } from "react";
import { RestaurantsContext } from "../context/RestaurantsContext";
import Loading from "../components/Loading";
import RestaurantViewElement from "../components/RestaurantViewElement";
import Header from "../components/Header";
import restaurantBackground from "../img/restaurant-background-6.jpg";

const ListViewRestaurants = () => {
  const [loading, setIsLoading] = useState(true);
  const { restaurants } = useContext(RestaurantsContext);

  const sortRestaurants = (restaurants) => {
    const sortedRestaurants = restaurants.sort((first, second) =>
      first.avarage_rating < second.avarage_rating
        ? 1
        : first.avarage_rating > second.avarage_rating
        ? -1
        : 0
    );
    return sortedRestaurants;
  };

  const orderedRestaurants = sortRestaurants(restaurants);

  return (
    <div
      style={{
        height: loading === true ? "100vh" : "100%",
        backgroundImage: `url(${restaurantBackground})`,
        backgroundSize: "cover",
        // backgroundRepeat: "repeat-y",
        backgroundPositionX: "right",
      }}
      className="d-flex flex-column"
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        }}
        className={`d-flex flex-column justify-content-center ${
          loading === true && "align-items-center"
        }`}
      >
        {loading === true && (
          <Loading time={500} handleLoading={setIsLoading} />
        )}
        {loading === false && <Header title={"Your saved restaurants!"} />}

        <div style={{ alignItems: "center" }} className="d-flex flex-column">
          {loading === false && restaurants && restaurants.length > 0
            ? orderedRestaurants.map((restaurant, idx) => {
                return (
                  // <div key={restaurant.name + Math.random()}>{restaurant.name}</div>
                  <div
                    key={restaurant.name + Math.random()}
                    style={{
                      marginLeft: "15%",
                      marginRight: "15%",
                      width: "40%",
                      marginTop: "2%",
                      marginBottom: "2%",
                      alignSelf: idx % 2 === 0 ? "flex-start" : "flex-end",
                    }}
                  >
                    <RestaurantViewElement restaurant={restaurant} />
                  </div>
                );
              })
            : loading === false && <div>No restaurants to view!</div>}
        </div>
      </div>
    </div>
  );
};

export default ListViewRestaurants;
