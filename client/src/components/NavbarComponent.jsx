import React from "react";

const NavbarComponent = () => {
  return (
    <div
      style={{ backgroundColor: "rgba(52, 58, 64, 0.9)" }}
      className="d-flex flex-row justify-content-between align-items-center py-3 border-top border-bottom border-primary"
    >
      <div
        style={{ width: 50, height: 50 }}
        className="d-flex justify-content-center align-items-center rounded-circle bg-primary text-white ml-4 h3"
      >
        TS
      </div>
      <div className="text-white mr-4">Temp Menu</div>
    </div>
  );
};

export default NavbarComponent;
