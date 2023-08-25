import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import restaurantBackgroundAlter from "../img/restaurant-background-3.jpg";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const renderMessage = () => {
    const { validatedEmail, validatedPassword } = validation(email, password);

    if (!validatedEmail && !validatedPassword) {
      return (
        <div className="d-flex flex-column justify-content-around py-2">
          <span className="text-danger small mb-1">
            • Please enter a valid email address.
          </span>
          <span className="text-danger small">
            • Password must be at least 8 characters long and contain at least
            one letter and one digit.
          </span>
        </div>
      );
    } else if (validatedEmail && !validatedPassword) {
      return (
        <div className="d-flex flex-column justify-content-around">
          <span className="text-danger small">
            • Password must be at least 8 characters long and contain at least
            one letter and one digit.
          </span>
        </div>
      );
    } else if (!validatedEmail && validatedPassword) {
      return (
        <div className="d-flex flex-column justify-content-around">
          <span className="text-danger small">
            • Please enter a valid email address.
          </span>
        </div>
      );
    } else {
      return (
        <div className="d-flex flex-row justify-content-start align-items-center py-1">
          👌
        </div>
      );
    }
  };

  const validation = (email, password) => {
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let validatedEmail = regexEmail.test(email);
    let validatedPassword = regexPassword.test(password);
    return { validatedEmail, validatedPassword };
  };

  const handleRegister = (event) => {
    /*CREATE A NEW USER*/
    event.preventDefault();
    axios
      .post("http://localhost:4000/signin", { email, password, username })
      .then((res) => {
        console.log("HERE IS THE RESPONSE: ", res);
        if (res.data.status === "failed") {
          setError(true);
        } else {
          setUserCreated(true);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url(${restaurantBackgroundAlter})`,
        backgroundSize: "cover",
      }}
    >
      <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <div className="d-flex flex-column justify-content-between align-items-center">
          <h1 className="display-1 text-white">Please create an account</h1>
          <h2 className="display-4 text-white pb-5">
            Insert a valid email and a password
          </h2>
        </div>
        {userCreated === false ? (
          <div style={{ zIndex: 1 }} className="p-3 bg-white w-25">
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="username"
                  placeholder="Select Username"
                  className="form-control"
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (username !== "") {
                      setLoading(true);
                    } else if (email === "") {
                      setLoading(false);
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="form-control"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (email !== "") {
                      setLoading(true);
                    } else if (email === "") {
                      setLoading(false);
                    }
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="form-control"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (password !== "") {
                      setLoading(true);
                    } else if (password === "") {
                      setLoading(false);
                    }
                  }}
                />
                {loading === true && renderMessage()}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <button className="btn btn-success">Create account</button>
              </div>
            </form>
            {error && (
              <p className="text-danger m-3">
                Email or password are not valid!
              </p>
            )}
          </div>
        ) : (
          <div className="p-3 bg-white w-25">
            <p>Congratulations!! Account created</p>
            <button onClick={() => navigate("/")} className="btn btn-success">
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
