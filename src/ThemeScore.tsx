import AbcScore from "./AbcScore";
import { TooltipWrapper } from "./TooltipWrapper";
import { getTheme, usePlayingInfo } from "./utils";

export function ThemeScore() {
  const { currentThemeId } = usePlayingInfo();
  const theme = getTheme(currentThemeId);
  const style = { height: 130 };
  if (!theme) return <div style={style}>(intro)</div>;
  return (
    <TooltipWrapper tooltip="The current theme's original form notated in C major/A minor" placement="bottom">
      <div style={style}>
        <AbcScore abc={theme.score || ""} />
      </div>
    </TooltipWrapper>
  );
}
