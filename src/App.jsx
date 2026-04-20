import { useEffect } from "react";
import { useDispatch, useSelector } from "./app/hooks";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";
import ErrorBanner from "./components/ErrorBanner";
import { setTheme } from "./features/theme/themeSlice";

export default function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const messages = useSelector((state) => state.chat.messages);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      dispatch(setTheme(saved));
    }
  }, [dispatch]);

  return (
    <div className="app-shell">
      <div className="app-frame">
        <ChatHeader />
        <main className="chat-main">
          <MessageList />
          <ErrorBanner />
          <ChatInput />
        </main>
      </div>
    </div>
  );
}
