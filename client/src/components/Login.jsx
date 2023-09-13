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
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        }}
        className="d-flex flex-column vh-100 justify-content-center align-items-center"
      >
        <h1 className="display-1 text-light">Welcome</h1>
        <h2 className="text-light mb-3">Please login</h2>
        <div
          style={{
            borderRadius: 25,
            boxShadow: "0px 0px 10px #999999",
            backgroundColor: "#333333",
          }}
          className="p-3 w-25"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="text-light">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="text-light">
                Password
              </label>
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
              {isWarned && (
                <Link to={"/signin"} className="text-light bg-primary btn">
                  Register
                </Link>
              )}
            </div>
          </form>
          {isWarned && (
            <p className="text-danger m-3">
              Email or password are not correct!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
