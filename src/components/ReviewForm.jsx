import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function ReviewForm({ bookId, onSubmit }) {
  const { user } = useAuth();

  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!user) {
      setMessage("Please login before submitting a review.");
      return;
    }

    if (!rating) {
      setMessage("Please select a rating.");
      return;
    }

    if (!review.trim()) {
      setMessage("Please write your review.");
      return;
    }

    const newReview = {
      id: Date.now(),
      bookId,
      user: user.name,
      rating: Number(rating),
      review: review.trim(),
      likes: 0,
      date: new Date().toLocaleDateString("en-IN"),
      comments: []
    };

    onSubmit(newReview);

    setRating("");
    setReview("");
    setMessage("Your review has been submitted successfully.");
  }

  return (
    <section className="review-section">

      <div className="section-heading">
        <span className="small-heading">
          YOUR OPINION
        </span>

        <h2>
          Write a Review
        </h2>

        <p>
          Share your experience with the community.
        </p>
      </div>

      <form
        className="review-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Rating</label>

          <select
            value={rating}
            onChange={(e) =>
              setRating(e.target.value)
            }
          >
            <option value="">
              Select a rating
            </option>

            <option value="5">
              ★★★★★ - Excellent
            </option>

            <option value="4">
              ★★★★☆ - Very Good
            </option>

            <option value="3">
              ★★★☆☆ - Good
            </option>

            <option value="2">
              ★★☆☆☆ - Average
            </option>

            <option value="1">
              ★☆☆☆☆ - Poor
            </option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Your Review
          </label>

          <textarea
            value={review}
            onChange={(e) =>
              setReview(e.target.value)
            }
            placeholder="What did you think about this book?"
            rows="6"
          />
        </div>

        <button
          className="primary-button"
          type="submit"
        >
          Submit Review
        </button>

        {message && (
          <div className="form-message">
            {message}
          </div>
        )}

      </form>
    </section>
  );
}

export default ReviewForm;