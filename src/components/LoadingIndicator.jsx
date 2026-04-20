export default function LoadingIndicator() {
  return (
    <div className="bubble-row assistant-row">
      <div className="bubble assistant-bubble loading-bubble">
        <div className="bubble-head">
          <div className="bubble-avatar" aria-hidden="true">
            AI
          </div>
          <span className="bubble-role">AI sedang menulis</span>
        </div>

        <div className="typing-dots" aria-label="Loading">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
