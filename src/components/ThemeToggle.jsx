import { MoonStar, SunMedium } from "lucide-react";
import { useDispatch, useSelector } from "../app/hooks";
import { toggleTheme } from "../features/theme/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={`Ubah ke tema ${mode === "light" ? "dark" : "light"}`}
    >
      {mode === "light" ? <MoonStar size={16} /> : <SunMedium size={16} />}
      <span>{mode === "light" ? "Dark" : "Light"}</span>
    </button>
  );
}
