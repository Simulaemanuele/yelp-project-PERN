import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
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
        height: "125vh",
        backgroundImage: `url(${restaurantBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
      }}
      className="d-flex flex-row"
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        }}
      >
        <Header />
        <div
          style={{ height: "100%", marginLeft: "7%", marginRight: "7%" }}
          className="d-flex flex-row justify-content-between"
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
