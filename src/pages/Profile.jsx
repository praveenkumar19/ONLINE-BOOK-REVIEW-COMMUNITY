import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

import initialReviews from "../data/reviews";

function Profile() {
  const {
    user,
    updateProfile
  } = useAuth();

  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState(user?.name || "");

  const [username, setUsername] =
    useState(user?.username || "");

  const [avatar, setAvatar] =
    useState(user?.avatar || "");

  const displayAvatar = avatar || user?.avatar || "";

  const [selectedAvatar, setSelectedAvatar] =
    useState("");

  const [cropModalOpen, setCropModalOpen] =
    useState(false);

  const [cropZoom, setCropZoom] =
    useState(1);

  const [avatarError, setAvatarError] =
    useState("");

  const fileInputRef = useRef(null);

  const [reviews, setReviews] =
    useState([]);

  const [readingBooks, setReadingBooks] =
    useState([]);

  useEffect(() => {
    setName(user?.name || "");
    setUsername(user?.username || "");
    setAvatar(user?.avatar || "");

    const storedReviews =
      JSON.parse(
        localStorage.getItem(
          "communityReviews"
        )
      ) || initialReviews;

    setReviews(
      storedReviews.filter(
        (review) =>
          review.user === user?.name
      )
    );

    const books =
      JSON.parse(
        localStorage.getItem(
          "wantToRead"
        )
      ) || [];

    setReadingBooks(books);
  }, [user]);

  if (!user) {
    return null;
  }

  function saveProfile(e) {
    e.preventDefault();

    updateProfile({
      name,
      username,
      avatar
    });

    setEditing(false);
  }

  function cancelEdit() {
    setAvatar(user?.avatar || "");
    setEditing(false);
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg"
    ];

    if (!allowedTypes.includes(file.type)) {
      setAvatarError(
        "Only PNG, JPG, and JPEG images are allowed."
      );
      e.target.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setAvatarError(
        "Image must be 3MB or smaller."
      );
      e.target.value = "";
      return;
    }

    setAvatarError("");

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedAvatar(reader.result);
      setCropZoom(1);
      setCropModalOpen(true);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function applyCrop() {
    if (!selectedAvatar) {
      return;
    }

    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;
      const cropSize = size / cropZoom;
      const cropX = (img.width - cropSize) / 2;
      const cropY = (img.height - cropSize) / 2;

      canvas.width = 320;
      canvas.height = 320;

      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropSize,
        cropSize,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const finalType =
        selectedAvatar.startsWith("data:image/png")
          ? "image/png"
          : "image/jpeg";

      const cropped = canvas.toDataURL(finalType, 0.92);
      setAvatar(cropped);
      updateProfile({
        avatar: cropped
      });
      setSelectedAvatar("");
      setCropModalOpen(false);
      setCropZoom(1);
    };

    img.src = selectedAvatar;
  }

  return (
    <main className="page-container">

      <section className="profile-header">

        <div className="profile-identity">

          <button
            type="button"
            className="profile-avatar-button"
            onClick={() =>
              fileInputRef.current?.click()
            }
            aria-label="Upload profile photo"
          >
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={user.name}
                className="profile-avatar-image"
              />
            ) : (
              user.name
                ?.charAt(0)
                .toUpperCase()
            )}

            <span className="camera-badge">
              📷
            </span>
          </button>

          <div className="profile-badges">
            <span className="profile-badge">
              Verified Reader
            </span>
            <span className="profile-badge subtle">
              Book Club Member
            </span>
          </div>

        </div>

        <div className="profile-main">

          {editing ? (

            <form
              className="profile-edit-form"
              onSubmit={saveProfile}
            >

              <label className="profile-field">
                <span>Full Name</span>
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Full Name"
                />
              </label>

              <label className="profile-field">
                <span>Username</span>
                <input
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  placeholder="Username"
                />
              </label>

              

              <div className="profile-edit-form-actions">

                <button
                  className="primary-button"
                  type="submit"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  className="secondary-button"
onClick={cancelEdit}
                >
                  Cancel
                </button>

              </div>

            </form>

          ) : (

            <>
              <span className="small-heading">
                MEMBER PROFILE
              </span>

              <h1>
                {user.name}
              </h1>

              <div className="profile-meta">
                <div>
                  <span>Username</span>
                  <strong>
                    @{user.username}
                  </strong>
                </div>

                <div>
                  <span>Email</span>
                  <strong>{user.email}</strong>
                </div>
              </div>

              <div className="profile-actions">
                <button
                  className="secondary-button"
                  onClick={() =>
                    setEditing(true)
                  }
                >
                  Edit Profile
                </button>

                <Link
                  to="/"
                  className="secondary-button ghost-button"
                >
                  Browse Books
                </Link>
              </div>
            </>

          )}

        </div>

      </section>

      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
        hidden
        onChange={handleAvatarChange}
      />

      {cropModalOpen && selectedAvatar && (
        <div className="crop-modal-backdrop">
          <div className="crop-modal">
            <div className="crop-modal-header">
              <h3>Crop your photo</h3>
              <button
                type="button"
                className="secondary-button ghost-button"
                onClick={() => {
                  setCropModalOpen(false);
                  setSelectedAvatar("");
                }}
              >
                Cancel
              </button>
            </div>

            <div className="crop-stage">
              <img
                src={selectedAvatar}
                alt="Crop preview"
                className="crop-image"
                style={{
                  transform: `scale(${cropZoom})`
                }}
              />
            </div>

            <label className="crop-slider">
              <span>Zoom</span>
              <input
                type="range"
                min="1"
                max="2.5"
                step="0.1"
                value={cropZoom}
                onChange={(e) =>
                  setCropZoom(Number(e.target.value))
                }
              />
            </label>

            <div className="crop-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setCropModalOpen(false);
                  setSelectedAvatar("");
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={applyCrop}
              >
                Use Photo
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="profile-stats">

        <div className="stat-card">

          <strong>
            {reviews.length}
          </strong>

          <span>
            Reviews
          </span>

        </div>

        <div className="stat-card">

          <strong>
            {readingBooks.length}
          </strong>

          <span>
            Want to Read
          </span>

        </div>

        <div className="stat-card">

          <strong>
            4.6
          </strong>

          <span>
            Average Rating
          </span>

        </div>

        <div className="stat-card">

          <strong>
            {reviews.reduce(
              (sum, item) =>
                sum + item.likes,
              0
            )}
          </strong>

          <span>
            Likes Received
          </span>

        </div>

      </section>

      <section className="profile-columns">

        <div className="profile-panel">

          <div className="panel-header">

            <div>

              <span className="small-heading">
                ACTIVITY
              </span>

              <h2>
                My Reviews
              </h2>

            </div>

          </div>

          {reviews.length === 0 ? (

            <div className="empty-panel">

              <p>
                You haven't written any reviews yet.
              </p>

              <Link
                to="/"
                className="text-link"
              >
                Explore books →
              </Link>

            </div>

          ) : (

            reviews.map((review) => (

              <div
                className="profile-review"
                key={review.id}
              >

                <div className="stars">
                  {"★".repeat(
                    review.rating
                  )}
                </div>

                <p>
                  "{review.review}"
                </p>

                <span>
                  ❤️ {review.likes} likes
                </span>

              </div>

            ))

          )}

        </div>

        <div className="profile-panel">

          <div className="panel-header">

            <div>

              <span className="small-heading">
                READING
              </span>

              <h2>
                My Reading List
              </h2>

            </div>

          </div>

          {readingBooks.length === 0 ? (

            <div className="empty-panel">

              <p>
                Your reading list is empty.
              </p>

              <Link
                to="/"
                className="text-link"
              >
                Add a book →
              </Link>

            </div>

          ) : (

            readingBooks.slice(0, 4).map(
              (book) => (

                <Link
                  to={`/book/${book.id}`}
                  className="mini-book"
                  key={book.id}
                >

                  <img
                    src={book.image}
                    alt={book.title}
                  />

                  <div>

                    <strong>
                      {book.title}
                    </strong>

                    <span>
                      {book.author}
                    </span>

                  </div>

                </Link>

              )
            )

          )}

        </div>

      </section>

    </main>
  );
}

export default Profile;