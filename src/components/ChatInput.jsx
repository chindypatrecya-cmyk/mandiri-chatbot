import { useState } from "react";
import { Send } from "lucide-react";
import { useDispatch, useSelector } from "../app/hooks";
import { addMessage } from "../features/chat/chatSlice";
import { sendMessage } from "../features/chat/chatThunks";

export default function ChatInput() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.chat.isLoading);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const content = text.trim();
    if (!content || isLoading) return;

    dispatch(addMessage({ role: "user", content }));
    setText("");
    dispatch(sendMessage());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="chat-input">
        Tulis pesan
      </label>

      <textarea
        id="chat-input"
        className="composer-input"
        placeholder="Tulis pesan Anda... (Enter untuk kirim, Shift+Enter untuk baris baru)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
      />

      <button
        className="send-button"
        type="submit"
        disabled={!text.trim() || isLoading}
      >
        <Send size={16} />
        <span>Kirim</span>
      </button>
    </form>
  );
}
