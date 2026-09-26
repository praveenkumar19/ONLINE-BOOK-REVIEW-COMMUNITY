import { Link } from "react-router-dom";

import books from "../data/books";
import initialReviews from "../data/reviews";

function Discover() {
  const reviews =
    JSON.parse(
      localStorage.getItem(
        "communityReviews"
      )
    ) || initialReviews;

  const popularBooks = [...books]
    .sort(
      (a, b) =>
        b.reviews - a.reviews
    )
    .slice(0, 4);

  const popularReviewers = [
    {
      name: "Arun",
      reviews: 24,
      likes: 542
    },
    {
      name: "Priya",
      reviews: 19,
      likes: 428
    },
    {
      name: "Karthik",
      reviews: 16,
      likes: 367
    },
    {
      name: "Meena",
      reviews: 14,
      likes: 289
    }
  ];

  const mostLiked =
    [...reviews]
      .sort(
        (a, b) =>
          b.likes - a.likes
      )
      .slice(0, 3);

  const discussions =
    [...reviews]
      .sort(
        (a, b) =>
          b.comments.length -
          a.comments.length
      )
      .slice(0, 4);

  return (
    <main className="page-container">

      <div className="page-header">

        <span className="small-heading">
          COMMUNITY
        </span>

        <h1>
          Discover
        </h1>

        <p>
          Explore what readers are discussing,
          reviewing, and recommending.
        </p>

      </div>

      <section className="discover-section">

        <div className="section-top">

          <div>
            <span className="small-heading">
              TRENDING
            </span>

            <h2>
              Popular Books
            </h2>
          </div>

          <Link
            to="/"
            className="text-link"
          >
            Browse all →
          </Link>

        </div>

        <div className="discover-book-grid">

          {popularBooks.map((book) => (

            <Link
              to={`/book/${book.id}`}
              className="discover-book"
              key={book.id}
            >

              <img
                src={book.image}
                alt={book.title}
              />

              <div>

                <span className="category">
                  {book.category}
                </span>

                <h3>
                  {book.title}
                </h3>

                <p>
                  {book.author}
                </p>

                <div className="book-rating">
                  ★ {book.rating}
                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      <section className="discover-section">

        <div className="section-heading">

          <span className="small-heading">
            COMMUNITY MEMBERS
          </span>

          <h2>
            Popular Reviewers
          </h2>

        </div>

        <div className="reviewer-grid">

          {popularReviewers.map(
            (reviewer, index) => (

              <div
                className="reviewer-card"
                key={reviewer.name}
              >

                <div className="avatar large">
                  {reviewer.name.charAt(0)}
                </div>

                <div className="reviewer-info">

                  <h3>
                    {reviewer.name}
                  </h3>

                  <p>
                    Community Reviewer
                  </p>

                  <div className="reviewer-stats">
                    <span>
                      {reviewer.reviews} Reviews
                    </span>

                    <span>
                      {reviewer.likes} Likes
                    </span>
                  </div>

                </div>

                <span className="rank">
                  #{index + 1}
                </span>

              </div>

            )
          )}

        </div>

      </section>

      <section className="discover-columns">

        <div className="discover-panel">

          <div className="panel-header">

            <div>
              <span className="small-heading">
                DISCUSSIONS
              </span>

              <h2>
                Trending Discussions
              </h2>
            </div>

          </div>

          {discussions.map((review) => (

            <div
              className="discussion-item"
              key={review.id}
            >

              <div className="avatar">
                {review.user.charAt(0)}
              </div>

              <div>

                <strong>
                  {review.user}
                </strong>

                <p>
                  "{review.review}"
                </p>

                <span>
                  💬 {review.comments.length}
                  {" "}comments
                </span>

              </div>

            </div>

          ))}

        </div>

        <div className="discover-panel">

          <div className="panel-header">

            <div>
              <span className="small-heading">
                COMMUNITY
              </span>

              <h2>
                Most Liked Reviews
              </h2>
            </div>

          </div>

          {mostLiked.map((review) => (

            <div
              className="liked-review"
              key={review.id}
            >

              <div className="stars">
                {"★".repeat(review.rating)}
              </div>

              <p>
                "{review.review}"
              </p>

              <div className="liked-review-footer">

                <strong>
                  {review.user}
                </strong>

                <span>
                  ❤️ {review.likes}
                </span>

              </div>

            </div>

          ))}

        </div>

      </section>

    </main>
  );
}

export default Discover;