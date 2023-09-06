import React from "react";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";
import restaurantBackground from "../img/restaurant-background-6.jpg";

const Home = () => {
  // const location = useLocation();
  // const { accountData } = useContext(RestaurantsContext);

  // useEffect(() => {
  //   if (location.state) {
  //     console.log("state in Home screen passed");
  //   } else {
  //     console.log("There's a problem!!");
  //   }
  // }, [location.state]);

  return (
    <div
      style={{
        height: "125vh",
        backgroundImage: `url(${restaurantBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-y",
      }}
      className="d-flex flex-column justify-content-between"
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        }}
      >
        <Header />
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
};

export default Home;
