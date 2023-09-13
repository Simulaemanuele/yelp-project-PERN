import React from "react";

const Header = ({ title }) => {
  return (
    <div className="my-xl-4 py-xl-4">
      <h1
        className="font-weight-light display-1 text-center text-white"
        style={{ fontFamily: "arboria-medium" }}
      >
        {title}
      </h1>
    </div>
  );
};

export default Header;
