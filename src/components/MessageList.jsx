import { useEffect, useRef } from "react";
import { useSelector } from "../app/hooks";
import ChatBubble from "./ChatBubble";
import LoadingIndicator from "./LoadingIndicator";

export default function MessageList() {
  const messages = useSelector((state) => state.chat.messages);
  const isLoading = useSelector((state) => state.chat.isLoading);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  return (
    <section className="message-list" aria-label="Riwayat percakapan">
      <div className="message-list-inner">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {isLoading && <LoadingIndicator />}

        <div ref={endRef} />
      </div>
    </section>
  );
}
