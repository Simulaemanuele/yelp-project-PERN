import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import restaurantBackground from "../img/restaurant-background-6.jpg";
import { RestaurantListViewer } from "../components/RestaurantListViewer";
import restaurantCardBackground1 from "../img/restaurant-card-1.jpg";
import restaurantCardBackground2 from "../img/restaurant-card-2.jpg";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const Home = () => {
  const { setRestaurants } = useContext(RestaurantsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get("/");
        setRestaurants(response.data.data.restaurants);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setRestaurants]);

  return (
    <div
      style={{
        height: "100%",
        backgroundImage: `url(${restaurantBackground})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "repeat-y",
      }}
      className="d-flex flex-column"
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        }}
      >
        <Header title={"Hey, track your favourites..."} />
        <div
          style={{
            height: "100%",
            marginLeft: "7%",
            marginRight: "7%",
            paddingBottom: "10%",
            paddingTop: "10%",
          }}
          className="d-flex flex-row justify-content-around"
        >
          <RestaurantListViewer
            img={restaurantCardBackground1}
            goTo={"listViewer"}
            text={"Take a look!"}
          />
          <RestaurantListViewer
            img={restaurantCardBackground2}
            goTo={"listEdit"}
            text={"Edit your fav!"}
          />
          {/* <RestaurantList /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
