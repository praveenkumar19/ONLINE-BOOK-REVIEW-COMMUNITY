import { useState } from "react";

function Notifications() {
  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        icon: "❤️",
        title: "Your review received a like",
        text: "Arun liked your review of The Alchemist.",
        time: "10 minutes ago",
        read: false
      },
      {
        id: 2,
        icon: "💬",
        title: "New comment",
        text: "Priya commented on your review.",
        time: "1 hour ago",
        read: false
      },
      {
        id: 3,
        icon: "📚",
        title: "New book added",
        text: "A new book is available in Fiction.",
        time: "3 hours ago",
        read: true
      },
      {
        id: 4,
        icon: "⭐",
        title: "Community milestone",
        text: "You have completed your first review.",
        time: "Yesterday",
        read: true
      }
    ]);

  function markAsRead(id) {
    setNotifications(
      notifications.map(
        (notification) =>
          notification.id === id
            ? {
                ...notification,
                read: true
              }
            : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications(
      notifications.map(
        (notification) => ({
          ...notification,
          read: true
        })
      )
    );
  }

  return (
    <main className="page-container">

      <div className="page-header">

        <span className="small-heading">
          ACCOUNT
        </span>

        <div className="notification-heading">

          <div>
            <h1>
              Notifications
            </h1>

            <p>
              Stay updated with your community activity.
            </p>
          </div>

          <button
            className="secondary-button"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>

        </div>

      </div>

      <section className="notifications-list">

        {notifications.map(
          (notification) => (

            <article
              className={
                notification.read
                  ? "notification-card"
                  : "notification-card unread"
              }
              key={notification.id}
              onClick={() =>
                markAsRead(
                  notification.id
                )
              }
            >

              <div className="notification-icon">
                {notification.icon}
              </div>

              <div className="notification-content">

                <h3>
                  {notification.title}
                </h3>

                <p>
                  {notification.text}
                </p>

                <span>
                  {notification.time}
                </span>

              </div>

              {!notification.read && (
                <div className="unread-dot" />
              )}

            </article>

          )
        )}

      </section>

    </main>
  );
}

export default Notifications;