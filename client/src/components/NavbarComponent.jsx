import React from "react";
import { useNavigate } from "react-router-dom";

const NavbarComponent = ({ data }) => {
  const navigate = useNavigate();

  console.log("Data in NAVBAR component ===> ", data.data);

  const username = data.data.username;
  const renderUserInitial = (username) => username.split("")[0].toUpperCase();

  const handleLogout = (event) => {
    event.preventDefault();
    let answer = window.confirm("Logout and return to Login page? ");
    if (answer) {
      navigate("/");
    } else {
      window.location.reload(true);
    }
  };

  return (
    <div
      style={{ backgroundColor: "rgba(52, 58, 64, 0.9)" }}
      className="d-flex flex-row justify-content-between align-items-center border-top border-bottom border-primary py-1"
    >
      <div className="h4 ml-4 text-white">Restaurants Finder</div>
      <div
        style={{ width: 32, height: 32 }}
        onClick={(e) => handleLogout(e)}
        className="d-flex justify-content-center align-items-center rounded-circle bg-primary text-white my-auto h4 mr-4"
      >
        {username !== "" ? renderUserInitial(username) : "RF"}
      </div>
      {/* <div className="mr-4 my-auto">
        <button className="btn text-white" onClick={(e) => handleLogout(e)}>
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default NavbarComponent;
