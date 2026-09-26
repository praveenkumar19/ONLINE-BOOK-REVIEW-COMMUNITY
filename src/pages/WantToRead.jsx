import {
  useEffect,
  useState
} from "react";

import { Link } from "react-router-dom";

import ToastMessage from "../components/ToastMessage";

function WantToRead() {
  const [books, setBooks] =
    useState([]);

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const savedBooks =
      JSON.parse(
        localStorage.getItem(
          "wantToRead"
        )
      ) || [];

    setBooks(savedBooks);
  }, []);

  function removeBook(id) {
    const removedBook =
      books.find(
        (book) => book.id === id
      );

    const updatedBooks =
      books.filter(
        (book) => book.id !== id
      );

    setBooks(updatedBooks);

    localStorage.setItem(
      "wantToRead",
      JSON.stringify(updatedBooks)
    );

    setMessage(
      `${removedBook?.title} removed from your reading list.`
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
          PERSONAL LIBRARY
        </span>

        <h1>
          Want to Read
        </h1>

        <p>
          Keep track of books you plan to read.
        </p>

      </div>

      {books.length === 0 ? (

        <div className="empty-library">

          <div className="empty-icon">
            +
          </div>

          <h2>
            Your reading list is empty
          </h2>

          <p>
            Browse our collection and add
            books you would like to read.
          </p>

          <Link
            to="/"
            className="primary-button"
          >
            Explore Books
          </Link>

        </div>

      ) : (

        <div className="reading-list">

          {books.map((book) => (

            <article
              className="reading-item"
              key={book.id}
            >

              <img
                src={book.image}
                alt={book.title}
              />

              <div className="reading-info">

                <span className="category">
                  {book.category}
                </span>

                <h2>
                  {book.title}
                </h2>

                <p>
                  By {book.author}
                </p>

                <div className="book-rating">
                  <span className="star">
                    ★
                  </span>

                  <strong>
                    {book.rating}
                  </strong>
                </div>

                <div className="reading-actions">

                  <Link
                    to={`/book/${book.id}`}
                    className="details-button"
                  >
                    View Details
                  </Link>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeBook(book.id)
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

export default WantToRead;