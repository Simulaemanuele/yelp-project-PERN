import React, { useState } from "react";
import ImageElement from "../components/ImageElement";
import Header from "../components/Header";
import restaurantBackground from "../img/restaurant-background-6.jpg";
import Loading from "../components/Loading";

function ProfileScreen() {
  const [loading, setLoading] = useState(true);

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
              <p className="text-light">Living place</p>
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
