import React from "react";
import Header from "../components/Header";
import RestaurantList from "../components/RestaurantList";

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
    <div className="d-flex flex-column justify-content-between">
      {/* <NavbarComponent data={accountData} /> */}
      <Header />
      <div className="m-3">
        <>
          {/* <AddRestaurant /> */}
          <RestaurantList />
        </>
      </div>
    </div>
  );
};

export default Home;
