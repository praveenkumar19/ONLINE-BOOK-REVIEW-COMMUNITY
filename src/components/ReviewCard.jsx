import { useState } from "react";

function ReviewCard({
  review,
  onLike,
  onComment
}) {
  const [comment, setComment] =
    useState("");

  const [showComments, setShowComments] =
    useState(false);

  function submitComment(e) {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    onComment(
      review.id,
      comment.trim()
    );

    setComment("");

    setShowComments(true);
  }

  return (
    <article className="review-card">

      <div className="review-user">

        <div className="avatar">
          {review.user.charAt(0)}
        </div>

        <div>
          <strong>
            {review.user}
          </strong>

          <small>
            {review.date}
          </small>
        </div>

      </div>

      <div className="stars">
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>

      <p className="review-text">
        "{review.review}"
      </p>

      <div className="review-actions">

        <button
          onClick={() =>
            onLike(review.id)
          }
        >
          ❤️ {review.likes}
        </button>

        <button
          onClick={() =>
            setShowComments(
              (value) => !value
            )
          }
        >
          💬 {review.comments.length} Comments
        </button>

      </div>

      {showComments && (
        <div className="comments">

          {review.comments.map(
            (item) => (
              <div
                className="comment"
                key={item.id}
              >
                <strong>
                  {item.user}:
                </strong>

                <span>
                  {item.text}
                </span>
              </div>
            )
          )}

          <form
            className="comment-form"
            onSubmit={submitComment}
          >
            <input
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Write a comment..."
            />

            <button>
              Post
            </button>
          </form>

        </div>
      )}

    </article>
  );
}

export default ReviewCard;