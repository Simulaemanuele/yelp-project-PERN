require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(morgan("dev"));

// get all restaurants
app.get("/api/v1/restaurants", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["mcdonalds", "wendys"], // mocked data
    },
  });
});

// get a restaurant
app.get("/api/v1/restaurants/:restaurantId", (req, res) => {
  console.log(req.params);
});

// create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
