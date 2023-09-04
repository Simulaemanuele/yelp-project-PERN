import React from "react";
import UpdateComponent from "../components/UpdateComponent";
// import NavbarComponent from "../components/NavbarComponent";
// import { RestaurantsContext } from "../context/RestaurantsContext";

const UpdatePage = () => {
  // const { accountData } = useContext(RestaurantsContext);
  return (
    <div>
      {/* <NavbarComponent data={accountData} /> */}
      <h1 className="text-center">Update Restaurant</h1>
      <UpdateComponent />
    </div>
  );
};

export default UpdatePage;
