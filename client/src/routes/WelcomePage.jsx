import React, { useState } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WelcomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState("");
  const [isWarned, setIsWarned] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4000/login", { email, password })
      .then((res) => {
        console.log("HERE IS THE RESPONSE: ", res);
        if (res.data.status === "failed") {
          setIsWarned(true);
        } else {
          setIsLogged("logged");
          handleNavigation(isLogged);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleNavigation = (isLogged) => {
    if (isLogged === "logged") {
      navigate("/home");
    }
  };

  return (
    <>
      <Login
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        handleNavigation={handleNavigation}
        isWarned={isWarned}
      />
    </>
  );
};

export default WelcomePage;
