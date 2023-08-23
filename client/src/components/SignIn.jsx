import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    /*CREATE A NEW USER*/
    event.preventDefault();
    axios
      .post("http://localhost:4000/signin", { email, password })
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
    <div className="d-flex flex-column vh-100 justify-content-center align-items-center bg-primary">
      {userCreated === false ? (
        <div className="p-3 bg-white w-25">
          <form onSubmit={handleRegister}>
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
              <button className="btn btn-success">Create account</button>
            </div>
          </form>
          {error && (
            <p className="text-danger m-3">Email or password are not valid!</p>
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
  );
};

export default SignIn;
