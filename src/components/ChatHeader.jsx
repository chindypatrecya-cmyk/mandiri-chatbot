import { Sparkles, Trash2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useDispatch } from "../app/hooks";
import { clearChat } from "../features/chat/chatSlice";

export default function ChatHeader() {
  const dispatch = useDispatch();

  return (
    <header className="chat-header">
      <div className="brand-block">
        <div className="brand-icon" aria-hidden="true">
          <Sparkles size={18} />
        </div>
        <div>
          <h1 className="brand-title">Chindy Chatbot</h1>
          <p className="brand-subtitle">Mandiri Asistent</p>
        </div>
      </div>

      <div className="header-actions">
        <button
          className="ghost-button"
          type="button"
          onClick={() => dispatch(clearChat())}
          aria-label="Hapus riwayat chat"
        >
          <Trash2 size={16} />
          <span>Reset</span>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
