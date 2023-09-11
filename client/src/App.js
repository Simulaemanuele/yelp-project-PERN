import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantContextProvider } from "./context/RestaurantsContext";
import WelcomePage from "./routes/WelcomePage";
import SignIn from "./components/SignIn";
import "../src/styles/App2.css";
import NavbarComponent from "./components/NavbarComponent";
import RestaurantList from "./components/RestaurantList";
import "./App.css";
import "./fonts/CHEESEPIZZA.ttf";

function App() {
  useEffect(() => {
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const enableScroll = () => {
      document.body.style.overflow = "";
    };

    document
      .querySelector(".scrollable-content")
      .addEventListener("mouseenter", disableScroll);
    document
      .querySelector(".scrollable-content")
      .addEventListener("mouseleave", enableScroll);

    return () => {
      document
        .querySelector(".scrollable-content")
        .removeEventListener("mouseenter", disableScroll);
      document
        .querySelector(".scrollable-content")
        .removeEventListener("mouseleave", enableScroll);
    };
  }, []);

  return (
    <RestaurantContextProvider>
      <div id="root" className="container-fluid p-0 scrollable-content">
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/home"
              element={
                <>
                  <NavbarComponent />
                  <Home />
                </>
              }
            />
            <Route path="/listViewer" element={<RestaurantList />} />
            <Route
              path="/signin"
              element={
                <>
                  <SignIn />
                </>
              }
            />
            <Route
              path="/restaurants/:id/update"
              element={
                <>
                  <NavbarComponent noSearch={true} />
                  <UpdatePage />
                </>
              }
            />
            <Route
              path="/home/restaurants/:id"
              element={
                <>
                  <NavbarComponent noSearch={true} />
                  <RestaurantDetailPage />
                </>
              }
            />
          </Routes>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
}

export default App;
