import React from "react";
import restaurantBackground from "../img/restaurant-background.jpg";
import { Link } from "react-router-dom";

const Login = ({
  email,
  password,
  setEmail,
  setPassword,
  isWarned,
  handleSubmit,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${restaurantBackground})`,
        backgroundSize: "cover",
        opacity: 0.9,
      }}
      className="d-flex flex-column vh-100 justify-content-center align-items-center bg-primary"
    >
      <h1 className="display-1 text-light">Welcome</h1>
      <h2 className="text-light mb-3">Please login</h2>
      <div className="p-3 bg-white w-25">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <button className="btn btn-success">Login</button>
            {isWarned && <Link to={"/signin"}>Register</Link>}
          </div>
        </form>
        {isWarned && (
          <p className="text-danger m-3">Email or password are not correct!</p>
        )}
      </div>
    </div>
  );
};

export default Login;
