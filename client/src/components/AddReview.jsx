import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate, useParams } from "react-router-dom";

const AddReview = ({ accountData }) => {
  const { id } = useParams();
  const [name, setName] = useState(accountData.username);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");
  const [errorSubmit, setErrorSubmit] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "" && rating !== "Rating" && reviewText !== "") {
      try {
        const response = await RestaurantFinder.post(`/${id}/addReview`, {
          name,
          review: reviewText,
          rating,
        });
        console.log(response);
        //refresh the page
        if (response.data.status === "success") {
          window.location.reload(false);
          // navigate(`restaurants/${id}`);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorSubmit(true);
    }
  };

  return (
    <div
      className="mb-xl-5 d-flex flex-column justify-content-center"
      style={{ height: "auto" }}
    >
      <form action="">
        <div className="form-row mt-5">
          <div className="form-group col-8">
            <label htmlFor="name" className="text-white">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="rating" className="text-white">
              Rating
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="custom-select"
            >
              <option disabled>Rating</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group mt-5">
          <label htmlFor="Review" className="text-white">
            Review
          </label>
          <textarea
            id="Review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button
          disabled={
            errorSubmit === true && name === "" && reviewText === ""
              ? true
              : false
          }
          onClick={(e) => handleSubmit(e)}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
      {errorSubmit === true && (
        <div className="text-danger">
          Error: please enter a review to submit!
        </div>
      )}
    </div>
  );
};

export default AddReview;
