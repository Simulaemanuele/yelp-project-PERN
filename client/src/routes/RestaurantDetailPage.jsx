import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";
import restaurantBackground from "../img/restaurant-background-4.jpg";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const {
    selectedRestaurant,
    setSelectedRestaurant,
    accountData,
    setAccountData,
  } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);

        console.log(response);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setSelectedRestaurant]);

  const renderRating = (restaurant) => {
    return (
      <>
        <StarRating rating={restaurant.avarage_rating} />
        <span className="text-warning ml-1">
          {restaurant.count ? `(${restaurant.count})` : "(0)"}
        </span>
      </>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${restaurantBackground})`,
        backgroundSize: "cover",
        opacity: 0.9,
        // height: "100vh",
        backgroundRepeat: "repeat-y",
      }}
      className="d-flex flex-column justify-content-evenly"
    >
      {/* <NavbarComponent data={accountData} /> */}
      {selectedRestaurant && (
        <div className="pt-xl-5 px-5">
          <div className="d-flex flex-column justify-content-evenly">
            <h1 className="text-center display-1 text-white">
              {selectedRestaurant.restaurant.name}
            </h1>
            <div className="text-center">
              {renderRating(selectedRestaurant.restaurant)}
            </div>
            <div className="mt-3 d-flex justify-content-center">
              <Reviews reviews={selectedRestaurant.reviews} />
            </div>
            <div className="d-flex justify-content-center">
              <AddReview
                accountData={accountData}
                setAccountData={setAccountData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
