import { Link } from "react-router-dom";

function BookCard({
  book,
  favorite,
  onFavorite
}) {
  return (
    <article className="book-card">

      <div className="book-cover">

        <img
          src={book.image}
          alt={book.title}
        />

        <button
          className={`favorite-floating ${
            favorite ? "liked" : ""
          }`}
          onClick={() =>
            onFavorite?.(book)
          }
        >
          {favorite ? "♥" : "♡"}
        </button>

      </div>

      <div className="book-card-content">

        <span className="category">
          {book.category}
        </span>

        <h3>
          {book.title}
        </h3>

        <p className="author">
          {book.author}
        </p>

        <div className="book-rating">
          <span className="star">
            ★
          </span>

          <strong>
            {book.rating}
          </strong>

          <span className="review-count">
            ({book.reviews} reviews)
          </span>
        </div>

        <Link
          to={`/book/${book.id}`}
          className="details-button"
        >
          View Details
        </Link>

      </div>
    </article>
  );
}

export default BookCard;