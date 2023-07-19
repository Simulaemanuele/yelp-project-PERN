require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

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
app.get("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params);
});

// create a restaurant
app.post("/api/v1/restaurants", (req, res) => {
  console.log(req.body);
});

// update a restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
