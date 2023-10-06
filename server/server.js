require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM restaurants;");
    const restaurantRatingsData = await db.query(
      " SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS avarage_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"
    );
    console.log("results ===> ", results);
    console.log("restaurantRatingData ===> ", restaurantRatingsData);

    res.status(200).json({
      status: "success",
      results: restaurantRatingsData.rows.length,
      data: {
        restaurants: restaurantRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  console.log(req.params);

  try {
    // this query is vulnerable to sql injection attacks
    // const results = await db.query(
    //   `SELECT * FROM restaurants WHERE id = ${req.params.id}`
    // );

    //this is correct
    const restaurant = await db.query(
      " SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS avarage_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1;",
      [req.params.id]
    ); // ' $ ' is a pg notation that works like a placeholder and the 2nd argument as an array is the parameter which will be replaced

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );
    console.log(restaurant);
    console.log(reviews);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    console.log(results);

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  try {
    const results = db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        reviews: newReview.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//login route
app.post("/login", async (req, res) => {
  try {
    const loginQuery = await db.query(
      "SELECT * FROM login WHERE email = $1 AND password = $2;",
      [req.body.email, req.body.password]
    );

    console.log("loginQuery ===> ", loginQuery);
    res.status(200).json({
      status: loginQuery.rows[0] ? "success" : "failed",
      data: loginQuery.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

//create user route
app.post("/signin", async (req, res) => {
  try {
    const loginQuery = await db.query(
      "INSERT INTO login (email, password, username) values ($1, $2, $3) returning *",
      [req.body.email, req.body.password, req.body.username]
    );

    console.log("loginQuery create new ===> ", loginQuery);
    res.status(201).json({
      status: loginQuery.rows[0] ? "success" : "failed",
      data: loginQuery.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/v1/usersDetails/:id", async (req, res) => {
  console.log(req.params);

  try {
    const restaurant = await db.query(
      "SELECT lo.*, ud.full_name, ud.genre, ud.eta, ud.description FROM login lo LEFT JOIN users_details ud ON lo.account_id = ud.account_id WHERE account_id = $1",
      [req.params.account_id]
    ); // ' $ ' is a pg notation that works like a placeholder and the 2nd argument as an array is the parameter which will be replaced

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );
    console.log(restaurant);
    console.log(reviews);
    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/usersDetails/insertData", async (req, res) => {
  try {
    const userQuery = await db.query(
      "INSERT INTO users_details (full_name, genre, age, description) values ($1, $2, $3, $4) returning *",
      [req.body.full_name, req.body.genre, req.body.age, req.body.description]
    );

    console.log("userQuery insert data ===> ", userQuery);
    res.status(201).json({
      status: userQuery.rows[0] ? "success" : "failed",
      data: userQuery.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
