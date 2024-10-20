import AbcScore from "./AbcScore";
import { getTheme, usePlayingInfo } from "./utils";

export function ThemeScore() {
  const { currentThemeId } = usePlayingInfo();
  const theme = getTheme(currentThemeId);
  if (!theme) return;
  return (
    <div style={{ height: 128 }}>
      <AbcScore abc={theme.score || ""} />
    </div>
  );
}
