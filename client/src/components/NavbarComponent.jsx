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
      className="d-flex flex-row justify-content-between align-items-center py-3 border-top border-bottom border-primary"
    >
      <div
        style={{ width: 50, height: 50 }}
        className="d-flex justify-content-center align-items-center rounded-circle bg-primary text-white ml-4 h3"
      >
        {username !== "" ? renderUserInitial(username) : "RF"}
      </div>
      <div className="mr-4">
        <button className="btn text-white" onClick={(e) => handleLogout(e)}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavbarComponent;
