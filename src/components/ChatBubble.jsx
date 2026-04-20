import { Bot, User } from "lucide-react";
import MarkdownContent from "./MarkdownContent";
import { formatTime } from "../utils/formatTime";

export default function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <article className={`bubble-row ${isUser ? "user-row" : "assistant-row"}`}>
      <div className={`bubble ${isUser ? "user-bubble" : "assistant-bubble"}`}>
        <div className="bubble-head">
          <div className="bubble-avatar" aria-hidden="true">
            {isUser ? <User size={14} /> : <Bot size={14} />}
          </div>
          <span className="bubble-role">{isUser ? "Anda" : "Chindy AI"}</span>
          <span className="bubble-time">{formatTime(message.createdAt)}</span>
        </div>

        <div className="bubble-body">
          {isUser ? (
            <p className="plain-text">{message.content}</p>
          ) : (
            <MarkdownContent content={message.content} />
          )}
        </div>
      </div>
    </article>
  );
}
