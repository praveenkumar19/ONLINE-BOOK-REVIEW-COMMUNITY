import { useState } from "react";
import { Link } from "react-router-dom";

import BookCard from "../components/BookCard";
import books from "../data/books";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Fiction",
    "Finance",
    "Self Development",
    "Fantasy",
    "Science Fiction",
    "Productivity",
  ];

  // Normalize text for searching
  function normalizeText(value = "") {
    return value
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Get favorites safely
  function getFavorites() {
    try {
      const stored = localStorage.getItem("favorites");

      if (!stored) {
        return [];
      }

      const parsed = JSON.parse(stored);

      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error reading favorites:", error);
      return [];
    }
  }

  const favorites = getFavorites();

  /*
    SEARCH
    --------------------------------
    Searches by:
    - Tamil book title
    - English book title (searchTitle)
    - Author
  */

  const query = normalizeText(search);

  const filteredBooks = books.filter((book) => {
    const title = normalizeText(book.title);
    const searchTitle = normalizeText(book.searchTitle);
    const author = normalizeText(book.author);

    const matchesSearch =
      query === "" ||
      title.includes(query) ||
      searchTitle.includes(query) ||
      author.includes(query);

    const matchesCategory =
      category === "All" ||
      normalizeText(book.category) === normalizeText(category);

    return matchesSearch && matchesCategory;
  });

  // Toggle favorite
  function toggleFavorite(book) {
    const current = getFavorites();

    const exists = current.some(
      (item) => item.id === book.id
    );

    const updated = exists
      ? current.filter(
          (item) => item.id !== book.id
        )
      : [...current, book];

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

    window.location.reload();
  }

  return (
    <main>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-label">
            ONLINE BOOK REVIEW COMMUNITY
          </span>

          <h1>
            Discover books.
            <br />
            Share your perspective.
          </h1>

          <p>
            Explore books, read community
            reviews, rate your favorites,
            join discussions, and build
            your personal reading library.
          </p>

          {/* ================= SEARCH ================= */}

          <div className="search-box">

            <span>⌕</span>

            <input
              type="search"
              placeholder="Search by book title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}

          </div>

          <div className="hero-links">

            <Link
              to="/discover"
              className="primary-button"
            >
              Explore Community
            </Link>

            <Link
              to="/favorites"
              className="secondary-button"
            >
              ♥ My Favorites
            </Link>

          </div>

        </div>

      </section>

      {/* ================= BOOKS ================= */}

      <section className="books-section">

        <div className="section-top">

          <div>

            <span className="small-heading">
              EXPLORE
            </span>

            <h2>
              Browse Books
            </h2>

          </div>

          <p>
            {filteredBooks.length}{" "}
            {filteredBooks.length === 1
              ? "book"
              : "books"}{" "}
            available
          </p>

        </div>

        {/* ================= CATEGORIES ================= */}

        <div className="category-list">

          {categories.map((item) => (

            <button
              key={item}
              type="button"
              className={
                category === item
                  ? "category-button selected"
                  : "category-button"
              }
              onClick={() => setCategory(item)}
            >
              {item}
            </button>

          ))}

        </div>

        {/* ================= SEARCH RESULT ================= */}

        {search.trim() && (

          <div className="search-result-info">

            <p>
              Search results for{" "}
              <strong>"{search}"</strong>
            </p>

          </div>

        )}

        {/* ================= BOOK GRID ================= */}

        {filteredBooks.length > 0 ? (

          <div className="book-grid">

            {filteredBooks.map((book) => (

              <BookCard
                key={book.id}
                book={book}
                favorite={favorites.some(
                  (item) => item.id === book.id
                )}
                onFavorite={toggleFavorite}
              />

            ))}

          </div>

        ) : (

          <div className="empty-state">

            <h3>
              No books found
            </h3>

            <p>
              Try another book title or author.
            </p>

            {search && (

              <button
                type="button"
                className="primary-button"
                onClick={() => setSearch("")}
              >
                Clear Search
              </button>

            )}

          </div>

        )}

      </section>

    </main>
  );
}

export default Home;
