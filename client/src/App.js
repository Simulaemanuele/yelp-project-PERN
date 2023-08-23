import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import RestaurantDetailPage from "./routes/RestaurantDetailPage";
import UpdatePage from "./routes/UpdatePage";
import { RestaurantContextProvider } from "./context/RestaurantsContext";
import WelcomePage from "./routes/WelcomePage";

function App() {
  return (
    <RestaurantContextProvider>
      <div className="container-fluid p-0">
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
            <Route
              path="/home/restaurants/:id"
              element={<RestaurantDetailPage />}
            />
          </Routes>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
}

export default App;
