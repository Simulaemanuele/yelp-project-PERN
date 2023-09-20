import React, { useContext, useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = ({
  setPressed,
  name,
  location,
  priceRange,
  setName,
  setLocation,
  setPriceRange,
  clearForm,
}) => {
  const { addRestaurants } = useContext(RestaurantsContext);

  // const [name, setName] = useState("");
  // const [location, setLocation] = useState("");
  // const [priceRange, setPriceRange] = useState("Price Range");
  const [error, setError] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (priceRange === "Price Range") {
      setError(true);
    }
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      console.log(response);
      if ((name !== "" && location !== "") || priceRange !== "Price Range") {
        addRestaurants(response.data.data.restaurant);
      }
      setTimeout(setPressed(false), 500);
      setTimeout(clearForm(), 500);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnCLick = (e) => {
    e.preventDefault();
    clearForm();
    setPressed(false);
  };

  useEffect(() => {
    if (name !== "" || location !== "" || priceRange !== "Price Range") {
      setError(false);
    }
  }, [name, location, priceRange]);

  return (
    <div
      style={{
        backgroundColor: "#343A40",
        padding: 20,
        borderRadius: 25,
        boxShadow: "0px 0px 15px #000000",
        height: "50%",
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div className="d-flex justify-content-between">
        <h3 className="text-light mb-3 font-weight-bold text-nowrap">
          Add a restaurant
        </h3>
        <div
          style={{
            position: "relative",
            bottom: "50%",
            cursor: "pointer",
            transform: `scale(${isHover === true ? "1.2" : "1.0"})`,
          }}
          className={`${isHover === true ? "text-warning" : "text-light"}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleOnCLick}
        >
          x
        </div>
      </div>
      <div className="w-100 mb-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Name"
        />
      </div>
      <div className="w-100 mb-2">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Location"
        />
      </div>
      <div className="w-100 mb-2">
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="custom-select mr-sm-2"
        >
          <option disabled>Price Range</option>
          <option value="1">$</option>
          <option value="2">$$</option>
          <option value="3">$$$</option>
          <option value="4">$$$$</option>
          <option value="5">$$$$$</option>
        </select>
      </div>
      <button
        style={{ backgroundColor: "#9AC1E5", borderRadius: 5 }}
        onClick={handleSubmit}
        className="btn w-100 text-black font-weight-bold"
        disabled={name === ""}
      >
        Add Restaurant
      </button>
      {error === true && (
        <div className="d-flex flex-column mt-2">
          <span className="text-danger small">
            You cannot add an empty record!
          </span>
          <span className="text-danger small">
            Please fill all the fields 👍
          </span>
        </div>
      )}
    </div>
  );
};

export default AddRestaurant;
