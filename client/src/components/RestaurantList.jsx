import React from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantList = ({ restaurants, setRestaurants }) => {
  let navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      console.log(response);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleSelect = (id) => {
    navigate(`restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <div className="d-flex flex-row align-items-center">
        <StarRating rating={restaurant.avarage_rating} color={"#9AC1E5"} />
        <span className="text-warning ml-1">({restaurant.count})</span>
      </div>
    );
  };

  return (
    <div className="list-group">
      <table
        style={{
          border: "5px solid",
          borderRadius: 25,
          overflow: "hidden",
          boxShadow: "0px 0px 15px #000000",
        }}
        className="table table-hover table-dark"
      >
        <thead>
          <tr style={{ backgroundColor: "#9AC1E5" }}>
            <th className="text-dark" scope="col">
              Restaurant
            </th>
            <th className="text-dark" scope="col">
              Location
            </th>
            <th className="text-dark" scope="col">
              Price Range
            </th>
            <th className="text-dark" scope="col">
              Ratings
            </th>
            <th className="text-dark" scope="col">
              Edit
            </th>
            <th className="text-dark" scope="col">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{"$".repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, restaurant.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
