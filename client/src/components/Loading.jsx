import React, { useEffect } from "react";
import "../styles/animation.css";

function Loading({ time, handleLoading }) {
  useEffect(() => {
    setTimeout(() => {
      handleLoading(false);
    }, time);
  }, []);
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="spin"></div>
      <h1 className="text-white mt-3">Loading...</h1>
    </div>
  );
}

export default Loading;
