import { AlertTriangle, X } from "lucide-react";
import { useDispatch, useSelector } from "../app/hooks";
import { dismissError } from "../features/chat/chatSlice";

export default function ErrorBanner() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.chat.error);

  if (!error) return null;

  return (
    <div className="error-banner" role="alert" aria-live="polite">
      <div className="error-content">
        <AlertTriangle size={16} />
        <p>{error}</p>
      </div>

      <button
        className="error-close"
        type="button"
        onClick={() => dispatch(dismissError())}
        aria-label="Tutup pesan error"
      >
        <X size={16} />
      </button>
    </div>
  );
}
