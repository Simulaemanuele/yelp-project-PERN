import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import StarRating from "../components/StarRating";
import restaurantBackground from "../img/restaurant-background-4.jpg";
import Loading from "../components/Loading";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
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
        <StarRating rating={restaurant.avarage_rating} color={"#DABD24"} />
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
        height:
          loading === true
            ? "100vh"
            : !selectedRestaurant && loading === false
            ? "100vh"
            : "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        }}
        className={`d-flex flex-column ${
          loading === true ? "justify-content-center" : "justify-content-evenly"
        } ${loading === true ? "align-items-center" : ""}`}
      >
        {loading === true && <Loading time={500} handleLoading={setLoading} />}
        {loading === false && !selectedRestaurant && (
          <div
            style={{
              marginLeft: "20%",
              marginRight: "20%",
              textAlign: "center",
            }}
            className="text-light"
          >
            <div className="display-2">{":'("}</div>
            <h1 className="display-3 text-wrap">
              Sorry something gone wrong! Please, try again later!
            </h1>
          </div>
        )}
        {selectedRestaurant && loading === false && (
          <div className="pt-xl-5 px-5">
            <div className="d-flex flex-column justify-content-evenly ml-5">
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
    </div>
  );
};

export default RestaurantDetailPage;
