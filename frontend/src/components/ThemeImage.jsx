import { useTheme } from "../Theme";

// Both assets stay mounted so the theme change cross-fades instead of replacing
// an image node abruptly. The wrapper receives the existing layout classes.
export default function ThemeImage({ lightSrc, darkSrc, alt, className }) {
  const { isDark } = useTheme();
  return <div className={`theme-image-frame ${className}`}>
    <img src={lightSrc} alt={alt} className={`theme-image-layer ${isDark ? "theme-image-hidden" : ""}`} />
    <img src={darkSrc} alt="" aria-hidden="true" className={`theme-image-layer ${isDark ? "" : "theme-image-hidden"}`} />
  </div>;
}
