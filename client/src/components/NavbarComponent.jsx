import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../img/icons/svg/search.svg";
import { RestaurantsContext } from "../context/RestaurantsContext";
import "../styles/common.css";
import StarRating from "./StarRating";

const NavbarComponent = ({ noSearch }) => {
  const [username, setUsername] = useState();
  const [visible, setVisible] = useState(false);
  const [searchedRestaurants, setSearchedRestaurant] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const {
    restaurants,
    setRestaurants,
    accountData: data,
    setAccountData,
  } = useContext(RestaurantsContext);
  console.log("Data in NAVBAR component ===> ", data);

  // useEffect(() => {
  //   setUsername(data.username);
  //   document.addEventListener("mousedown", handleClick, false);
  //   return () => document.removeEventListener("mousedown", handleClick, false);
  // }, []);
  // Aggiorna il valore di data.username e localStorage
  // const updateUsername = (newUsername) => {
  //   setAccountData((prevData) => ({ ...prevData, username: newUsername }));
  //   localStorage.setItem("username", newUsername);
  // };

  useEffect(() => {
    const localData = localStorage.getItem("localData");
    const localUsername = localStorage.getItem("username");
    const localRestaurants = localStorage.getItem("restaurants");
    if (localData || localRestaurants) {
      setAccountData(localData);
      setUsername(localUsername);
      // setRestaurants(localRestaurants);
    } else if (data || restaurants) {
      setAccountData(data);
      setUsername(data.username);
      localStorage.setItem("username", data.username);
      localStorage.setItem("localData", data);
      // localStorage.setItem("restaurants", restaurants);
    }

    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  }, [data, restaurants, setAccountData, setRestaurants]);

  const renderUserInitial = (username) => {
    console.log("USERNAME IN RENDER INITIAL METHOD ======>  ", username);
    const result =
      username !== "" || username !== undefined
        ? username.split("")[0].toUpperCase()
        : "";

    return result;
  };

  const handleClick = (e) => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    } else {
      setVisible(false);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    let answer = window.confirm("Logout and return to Login page? ");
    if (answer) {
      navigate("/");
    } else {
      window.location.reload(true);
    }
  };

  const handleChange = (e) => {
    setSearchedRestaurant(e.target.value);
    if (!visible) {
      setVisible(true);
    }
  };

  const searchFilter = (searchValue, list, searchBy) => {
    const lowerCaseQuery = searchValue.toLowerCase();
    const filteredList = searchValue
      ? list.filter((x) => x[searchBy].toLowerCase().includes(lowerCaseQuery))
      : [];
    return filteredList;
  };

  const goToSelection = (id) => {
    setVisible(false);
    navigate(`restaurants/${id}`);
  };

  const filteredListByMethod = searchFilter(
    searchedRestaurants,
    restaurants,
    "name"
  );

  return (
    <div style={{ position: "fixed", width: "100%", zIndex: 1 }}>
      <div
        style={{ backgroundColor: "rgba(52, 58, 64, 0.9)" }}
        className="d-flex flex-row justify-content-between align-items-center border-top border-bottom border-primary py-1"
      >
        <div
          className="h4 ml-4 text-white"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/home")}
        >
          Restaurants Finder
        </div>
        <div className="d-flex flex-row justify-content-between align-items-center">
          {!!!noSearch && (
            <div className="d-flex flex-row justify-content-between align-items-center">
              <form className="form-inline mr-3" name="search">
                <input
                  id="search"
                  type="search"
                  placeholder="Search..."
                  value={searchedRestaurants}
                  form="search"
                  name="search"
                  className="form-control my-sm-1"
                  onChange={handleChange}
                  // onFocus={() => {
                  //   setVisible(true);
                  // }}
                />
                <button className="btn d-flex flex-row justify-content-center align-items-center">
                  <img src={SearchIcon} alt="Search Icon" />
                </button>
              </form>
            </div>
          )}
          <div
            style={{ width: 32, height: 32 }}
            onClick={(e) => handleLogout(e)}
            className="d-flex justify-content-center align-items-center rounded-circle bg-primary text-white my-auto h4 mr-4"
          >
            {username !== "" && username !== undefined
              ? renderUserInitial(username)
              : "RF"}
          </div>
        </div>
      </div>
      <div style={{ position: "relative", height: 250 }}>
        <div
          ref={dropdownRef}
          style={{
            borderLeft: searchedRestaurants !== "" ? "3px solid #000" : "",
            borderRight: searchedRestaurants !== "" ? "3px solid #000" : "",
            borderBottom: searchedRestaurants !== "" ? "3px solid #000" : "",
          }}
          className={`dropdown ${
            // visible || (restaurants && restaurants.length !== 0 && visible)
            visible ? "v" : ""
          }`}
          aria-labelledby="search"
        >
          {filteredListByMethod.length === 0 &&
            visible &&
            searchedRestaurants !== "" && (
              <div className="dropdown_item">No results</div>
            )}
          {restaurants &&
            visible &&
            searchedRestaurants !== "" &&
            filteredListByMethod.map((x) => (
              <div
                className="dropdown_item"
                key={x.id}
                onClick={() => goToSelection(x.id)}
              >
                Name: {x.name}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: "5px",
                  }}
                >
                  {"Rate: "}{" "}
                  <div style={{ paddingRight: 50 }}>
                    {<StarRating rating={x.avarage_rating} />}
                  </div>
                </div>
                Location: {x.location}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
