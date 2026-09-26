import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import books from "../data/books";
import initialReviews from "../data/reviews";

import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";
import ToastMessage from "../components/ToastMessage";
import { useAuth } from "../context/AuthContext";

function BookDetails() {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  const bookId = Number(id);

  const book = books.find((item) => item.id === bookId);

  const [reviews, setReviews] = useState([]);
  const [wantToRead, setWantToRead] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [message, setMessage] = useState("");

  // Load reviews, reading list and favorites
  useEffect(() => {
    let storedReviews = localStorage.getItem("communityReviews");

    if (!storedReviews) {
      localStorage.setItem(
        "communityReviews",
        JSON.stringify(initialReviews)
      );

      storedReviews = JSON.stringify(initialReviews);
    }

    const allReviews = JSON.parse(storedReviews);

    setReviews(
      allReviews.filter((review) => review.bookId === bookId)
    );

    const savedReading =
      JSON.parse(localStorage.getItem("wantToRead")) || [];

    setWantToRead(
      savedReading.some((item) => item.id === bookId)
    );

    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorite(
      savedFavorites.some((item) => item.id === bookId)
    );
  }, [bookId]);

  // Book not found
  if (!book) {
    return (
      <main className="page-container">
        <div className="not-found">
          <div className="empty-icon">404</div>

          <h1>Book Not Found</h1>

          <p>
            The requested book could not be found in our collection.
          </p>

          <Link to="/" className="primary-button">
            Back to Books
          </Link>
        </div>
      </main>
    );
  }

  // Add book to Want to Read
  function addToWantToRead() {
    const existing =
      JSON.parse(localStorage.getItem("wantToRead")) || [];

    const alreadyAdded = existing.some(
      (item) => item.id === book.id
    );

    if (alreadyAdded) {
      setMessage(
        "இந்த புத்தகம் ஏற்கனவே உங்கள் Reading List-ல் உள்ளது."
      );
      return;
    }

    const updated = [...existing, book];

    localStorage.setItem(
      "wantToRead",
      JSON.stringify(updated)
    );

    setWantToRead(true);

    setMessage(
      `${book.title} உங்கள் Reading List-ல் சேர்க்கப்பட்டது.`
    );
  }

  // Add / Remove Favorite
  function toggleFavorite() {
    const existing =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = existing.some(
      (item) => item.id === book.id
    );

    let updated;

    if (exists) {
      updated = existing.filter(
        (item) => item.id !== book.id
      );

      setFavorite(false);

      setMessage(
        `${book.title} Favorites-ல் இருந்து நீக்கப்பட்டது.`
      );
    } else {
      updated = [...existing, book];

      setFavorite(true);

      setMessage(
        `${book.title} Favorites-ல் சேர்க்கப்பட்டது.`
      );
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  }

  // Add new review
  function addReview(newReview) {
    const allReviews =
      JSON.parse(
        localStorage.getItem("communityReviews")
      ) || [];

    const updated = [...allReviews, newReview];

    localStorage.setItem(
      "communityReviews",
      JSON.stringify(updated)
    );

    setReviews(
      updated.filter(
        (review) => review.bookId === bookId
      )
    );

    setMessage("Your review has been added successfully.");
  }

  // Like review
  function likeReview(reviewId) {
    const allReviews =
      JSON.parse(
        localStorage.getItem("communityReviews")
      ) || [];

    const updated = allReviews.map((review) =>
      review.id === reviewId
        ? {
            ...review,
            likes: (review.likes || 0) + 1,
          }
        : review
    );

    localStorage.setItem(
      "communityReviews",
      JSON.stringify(updated)
    );

    setReviews(
      updated.filter(
        (review) => review.bookId === bookId
      )
    );
  }

  // Add comment
  function addComment(reviewId, commentText) {
    const allReviews =
      JSON.parse(
        localStorage.getItem("communityReviews")
      ) || [];

    const newComment = {
      id: Date.now(),
      user: "Praveen",
      text: commentText,
    };

    const updated = allReviews.map((review) =>
      review.id === reviewId
        ? {
            ...review,
            comments: [
              ...(review.comments || []),
              newComment,
            ],
          }
        : review
    );

    localStorage.setItem(
      "communityReviews",
      JSON.stringify(updated)
    );

    setReviews(
      updated.filter(
        (review) => review.bookId === bookId
      )
    );
  }

  return (
    <main className="page-container">

      {/* Toast Message */}
      <ToastMessage
        message={message}
        onClose={() => setMessage("")}
      />

      {/* Back Button */}
      <Link to="/" className="back-link">
        ← Back to Books
      </Link>

      {/* Book Details */}
      <section className="details-card">

        {/* Book Cover */}
        <div className="details-cover">
          <img
            src={book.image}
            alt={book.title}
          />
        </div>

        {/* Book Information */}
        <div className="details-content">

          <span className="category">
            {book.category}
          </span>

          <h1>{book.title}</h1>

          <p className="details-author">
            By {book.author}
          </p>

          {/* Rating */}
          <div className="details-rating">

            <span className="large-star">
              ★
            </span>

            <strong>
              {book.rating}
            </strong>

            <span>
              {book.reviews} community reviews
            </span>

          </div>

          {/* Book Meta */}
          <div className="book-meta">

            <div>
              <span>Published</span>

              <strong>
                {book.year || "Ancient / Classical"}
              </strong>
            </div>

            <div>
              <span>Language</span>

              <strong>
                {book.language}
              </strong>
            </div>

            <div>
              <span>Category</span>

              <strong>
                {book.category}
              </strong>
            </div>

          </div>

          {/* Description */}
          <div className="description-section">

            <h3>
              About this book
            </h3>

            <p>
              {book.description}
            </p>

          </div>

          {/* Action Buttons */}
          <div className="details-actions">

            {/* Read Book */}
            {book.readLink && user ? (
              <a
                href={book.readLink}
                target="_blank"
                rel="noopener noreferrer"
                className="read-book-button"
              >
                📖 Read Book
              </a>
            ) : book.readLink ? (
              <Link
                to="/login"
                state={{
                  from: `${location.pathname}${location.search}${location.hash}`,
                }}
                className="read-book-button"
              >
                📖 Sign In to Read
              </Link>
            ) : (
              <button
                className="read-book-button disabled"
                disabled
              >
                📖 Reading Link Unavailable
              </button>
            )}

            {/* Want to Read */}
            <button
              className="primary-button"
              onClick={addToWantToRead}
            >
              {wantToRead
                ? "✓ In Reading List"
                : "+ Add to Want to Read"}
            </button>

            {/* Favorite */}
            <button
              className={
                favorite
                  ? "favorite-button active"
                  : "favorite-button"
              }
              onClick={toggleFavorite}
            >
              {favorite
                ? "♥ Favorited"
                : "♡ Favorite"}
            </button>

          </div>

        </div>
      </section>

      {/* Community Reviews */}
      <section className="reader-reviews">

        <div className="section-heading">

          <span className="small-heading">
            COMMUNITY
          </span>

          <h2>
            Reader Reviews
          </h2>

          <p>
            See what other readers think about this book.
          </p>

        </div>

        {reviews.length === 0 ? (

          <div className="no-reviews">

            <div className="empty-icon">
              ✍
            </div>

            <h3>
              No reviews yet
            </h3>

            <p>
              Be the first reader to share your opinion.
            </p>

          </div>

        ) : (

          <div className="reviews-list">

            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onLike={likeReview}
                onComment={addComment}
              />
            ))}

          </div>

        )}

      </section>

      {/* Review Form */}
      <ReviewForm
        bookId={book.id}
        onSubmit={addReview}
      />

    </main>
  );
}

export default BookDetails;