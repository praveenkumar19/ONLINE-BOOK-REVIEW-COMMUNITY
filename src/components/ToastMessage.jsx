function ToastMessage({ message, type = "success", onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`toast-message ${type}`}>
      <div className="toast-icon">
        {type === "success" ? "✓" : "!"}
      </div>

      <div className="toast-content">
        <strong>
          {type === "success" ? "Success" : "Notice"}
        </strong>

        <span>{message}</span>
      </div>

      <button
        className="toast-close"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

export default ToastMessage;