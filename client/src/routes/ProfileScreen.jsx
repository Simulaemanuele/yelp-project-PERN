import React, { useContext, useEffect, useState } from "react";
import ImageElement from "../components/ImageElement";
import Header from "../components/Header";
import restaurantBackground from "../img/restaurant-background-6.jpg";
import Loading from "../components/Loading";
import axios from "axios";
import UserFinder from "../apis/UserFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useParams } from "react-router-dom";

function ProfileScreen() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName_] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [description, setDescription] = useState();
  const { userData, setUserData, localStorageGet } =
    useContext(RestaurantsContext);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await UserFinder.get(`/${id}`);
    //     setUserData();
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // fetchData();
    const localUsername = localStorage.getItem("username");
    const localData = localStorage.getItem("localData");
    console.log("In PROFILE: ", localData, localUsername);
  }, []);

  const handleSubmit = async () => {
    const response = await UserFinder.put(`/update:${id}`, {
      full_name: fullName,
      gender,
      age,
      description,
    });
  };

  return (
    <div
      style={{
        height: loading === true ? "100vh" : "100%",
        backgroundImage: `url(${restaurantBackground})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "repeat-y",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        }}
        className="d-flex flex-column justify-content-around align-items-center"
      >
        {loading === true && <Loading time={500} handleLoading={setLoading} />}
        {loading === false && (
          <div>
            <Header title={"Personal profile"} />
            <div>
              <ImageElement />
              <h1 className="text-light">Profile name</h1>
            </div>
            <div>
              <h2 className="text-light">Personal data</h2>
              <p className="text-light">Gender</p>
              <p className="text-light">Age</p>
            </div>
            <div>
              <h2 className="text-light">Description</h2>
              <p className="text-light">Description...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
