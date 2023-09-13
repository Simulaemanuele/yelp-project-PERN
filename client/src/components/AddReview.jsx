import React, { useContext, useEffect, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddReview = ({ accountData, setAccountData }) => {
  const { accountData: data, setAccountData: contextSettingData } =
    useContext(RestaurantsContext);
  const localUsername = localStorage.getItem("username");
  const { id } = useParams();
  const [name, setName] = useState(localUsername);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // const navigate = useNavigate();

  useEffect(() => {
    if (name !== localUsername) {
      setName(localUsername);
    }
  }, [localUsername]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (name !== "" && rating !== "Rating" && reviewText !== "") {
      try {
        const response = await RestaurantFinder.post(`/${id}/addReview`, {
          name,
          review: reviewText,
          rating,
        });
        console.log(response);
        if (response.accountData.status === "success") {
          const updatedAccountData = {
            ...accountData,
            username: accountData.username,
          };
          setAccountData(updatedAccountData);

          // Resetta i campi del form
          setName("");
          setRating("Rating");
          setReviewText("");
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
      style={{ height: "auto", width: "50%" }}
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
              className="form-control py-2"
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
              className="custom-select "
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
            placeholder="Write here your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="form-control py-2"
          ></textarea>
        </div>
        <button
          disabled={
            errorSubmit === true && name === "" && reviewText === ""
              ? true
              : false
          }
          onClick={handleSubmit}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          type="submit"
          style={{
            width: "100%",
            borderRadius: 15,
            backgroundColor: isHover === true ? "#337EC4" : "#2D71B0",
            color: "#ffffff",
            transform: `scale(${isHover === true ? "1.1" : "1.0"})`,
            fontWeight: `${isHover === true ? "bold" : ""}`,
            fontSize: `${isHover === true ? "23px" : ""}`,
            transitionDuration: "500ms",
          }}
          className="py-3"
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
