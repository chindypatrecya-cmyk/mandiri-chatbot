import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sendMessage } from "./chatThunks";

function makeWelcomeMessage() {
  return [
    {
      id: nanoid(),
      role: "assistant",
      content:
        "Halo! Saya siap membantu. Kirim pesan Anda untuk memulai percakapan.",
      createdAt: Date.now(),
    },
  ];
}

function loadMessages() {
  if (typeof window === "undefined") return makeWelcomeMessage();

  try {
    const raw = window.localStorage.getItem("chatMessages");
    if (!raw) return makeWelcomeMessage();

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return makeWelcomeMessage();
  } catch {
    return makeWelcomeMessage();
  }
}

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: loadMessages(),
    isLoading: false,
    error: null,
  },
  reducers: {
    addMessage: {
      reducer(state, action) {
        state.messages.push(action.payload);
      },
      prepare({ role, content }) {
        return {
          payload: {
            id: nanoid(),
            role,
            content,
            createdAt: Date.now(),
          },
        };
      },
    },
    hydrateMessages(state, action) {
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        state.messages = action.payload;
      }
    },
    clearChat(state) {
      state.messages = makeWelcomeMessage();
      state.isLoading = false;
      state.error = null;
    },
    dismissError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push({
          id: nanoid(),
          role: "assistant",
          content: action.payload.text,
          createdAt: Date.now(),
        });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || action.error.message || "Terjadi kesalahan.";
      });
  },
});

export const { addMessage, hydrateMessages, clearChat, dismissError } =
  chatSlice.actions;

export default chatSlice.reducer;
