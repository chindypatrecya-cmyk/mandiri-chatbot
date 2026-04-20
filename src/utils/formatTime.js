export function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}
