import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateComponent = (props) => {
  const { id } = useParams();
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log("response ===> ", response);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        console.log(
          "price_range in UpdateCOmponent: ",
          response.data.data.price_range
        );
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    console.log(updatedRestaurant);
    navigate("/");
  };

  return (
    <div
      style={{ width: "100%" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1 className="text-white display-3">{restaurants[0].name}</h1>
      <form style={{ width: "50%" }} action="">
        <div className="form-group">
          <label className="text-white" htmlFor="name">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="text-white" htmlFor="location">
            Location
          </label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="text-white" htmlFor="price_range">
            Price Range
          </label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            type="number"
            className="form-control"
          />
        </div>

        <button
          style={{ width: "100%", borderRadius: 15 }}
          onClick={(e) => handleSubmit(e)}
          className="btn btn-primary py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateComponent;
