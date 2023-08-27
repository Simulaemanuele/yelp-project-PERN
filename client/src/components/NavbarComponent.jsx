import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "../img/icons/svg/search.svg";
import { RestaurantsContext } from "../context/RestaurantsContext";

const NavbarComponent = ({ data }) => {
  const [username, setUsername] = useState("");
  const [visible, setVisible] = useState(false);
  const [searchedRestaurants, setSearchedRestaurant] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const { restaurants, selectedRestaurant } = useContext(RestaurantsContext);

  console.log("Data in NAVBAR component ===> ", data);

  useEffect(() => {
    setUsername(data.username);
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  }, [data.username]);

  const renderUserInitial = (username) => username.split("")[0].toUpperCase();

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
      : list;
    return filteredList;
  };

  return (
    <div
      style={{ backgroundColor: "rgba(52, 58, 64, 0.9)" }}
      className="d-flex flex-row justify-content-between align-items-center border-top border-bottom border-primary py-1"
    >
      <div className="h4 ml-4 text-white">Restaurants Finder</div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <form className="form-inline" name="search" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search..."
              value={searchedRestaurants}
              form="search"
              name="search"
              className="form-control my-sm-1"
              onChange={handleChange}
              onFocus={() => {
                setVisible(true);
              }}
            />
            <button className="btn d-flex flex-row justify-content-center align-items-center">
              <img src={SearchIcon} alt="Search Icon" />
            </button>
          </form>
          <div ref={dropdownRef} className={`dropdown`}></div>
        </div>
        <div
          style={{ width: 32, height: 32 }}
          onClick={(e) => handleLogout(e)}
          className="d-flex justify-content-center align-items-center rounded-circle bg-primary text-white my-auto h4 mr-4"
        >
          {username !== "" ? renderUserInitial(username) : "RF"}
        </div>
      </div>
    </div>
  );
};

export default NavbarComponent;
