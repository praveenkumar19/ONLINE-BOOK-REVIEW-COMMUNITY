import {
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import ToastMessage from "../components/ToastMessage";

function Favorites() {
  const [favorites, setFavorites] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem(
            "favorites"
          )
        ) || []
      );
    });

  const [message, setMessage] =
    useState("");

  function removeFavorite(id) {
    const removed =
      favorites.find(
        (book) => book.id === id
      );

    const updated =
      favorites.filter(
        (book) => book.id !== id
      );

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

    setMessage(
      `${removed?.title} removed from favorites.`
    );
  }

  return (
    <main className="page-container">

      <ToastMessage
        message={message}
        onClose={() => setMessage("")}
      />

      <div className="page-header">

        <span className="small-heading">
          PERSONAL COLLECTION
        </span>

        <h1>
          My Favorites
        </h1>

        <p>
          Your collection of favorite books.
        </p>

      </div>

      {favorites.length === 0 ? (

        <div className="empty-library">

          <div className="empty-icon">
            ♥
          </div>

          <h2>
            No favorite books yet
          </h2>

          <p>
            Save books you love so you
            can easily find them later.
          </p>

          <Link
            to="/"
            className="primary-button"
          >
            Discover Books
          </Link>

        </div>

      ) : (

        <div className="book-grid">

          {favorites.map((book) => (

            <article
              className="book-card"
              key={book.id}
            >

              <div className="book-cover">

                <img
                  src={book.image}
                  alt={book.title}
                />

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

                </div>

                <div className="card-actions">

                  <Link
                    to={`/book/${book.id}`}
                    className="details-button"
                  >
                    View Details
                  </Link>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFavorite(book.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}

    </main>
  );
}

export default Favorites;