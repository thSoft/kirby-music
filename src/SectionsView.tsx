import distinctColors from "distinct-colors";
import invert from "invert-color";
import { Badge, Col, Stack } from "react-bootstrap";
import { Section, Theme, themes, Track } from "./data";
import { TooltipWrapper } from "./TooltipWrapper";
import { getSectionIndex, getTheme, usePlayingInfo } from "./utils";

export function SectionsView({ track }: { track: Track }) {
  return (
    <Stack direction="horizontal">
      {track.sections.map((section, sectionIndex) => (
        <SectionView section={section} sectionIndex={sectionIndex} track={track} key={sectionIndex} />
      ))}
    </Stack>
  );
}

function SectionView({ section, sectionIndex, track }: { section: Section; sectionIndex: number; track: Track }) {
  return (
    <Col xs="auto" style={{ padding: 0 }}>
      <Stack gap={0}>
        {section.themeIds.map((themeId, themeOccurrenceIndex) => (
          <ThemeOccurrence
            themeId={themeId}
            themeOccurrenceIndex={themeOccurrenceIndex}
            section={section}
            sectionIndex={sectionIndex}
            track={track}
            key={themeId}
          />
        ))}
      </Stack>
    </Col>
  );
}

function ThemeOccurrence({
  themeId,
  themeOccurrenceIndex,
  section,
  sectionIndex,
  track,
}: {
  themeId: string;
  themeOccurrenceIndex: number;
  section: Section;
  sectionIndex: number;
  track: Track;
}) {
  const { currentTrackId, currentThemeId, currentSectionIndex, update } = usePlayingInfo();
  if (!track) return;
  const theme = getTheme(themeId);
  if (!theme) return;
  const isPlayingTheme = currentThemeId == themeId;
  const isPlayingThemeOccurrence = currentTrackId == track.id && currentSectionIndex == sectionIndex && isPlayingTheme;
  const onClick = function () {
    update(track.id, getSectionIndex(track, section.start), section.start, themeId);
  };

  return (
    <ThemeBadge
      theme={theme}
      key={themeOccurrenceIndex}
      isPlayingTheme={isPlayingTheme}
      isPlayingThemeOccurrence={isPlayingThemeOccurrence}
      onClick={onClick}
    />
  );
}

const colors = distinctColors({ count: themes.length });

function ThemeBadge({
  theme,
  isPlayingTheme,
  isPlayingThemeOccurrence,
  onClick,
}: {
  theme: Theme;
  isPlayingTheme?: boolean;
  isPlayingThemeOccurrence?: boolean;
  onClick?: () => void;
}) {
  const themeIndex = themes.indexOf(theme);
  const backgroundColor = colors[themeIndex].hex();
  const foregroundColor = invert(backgroundColor, true);
  const playingColor = "black";
  const relatedColor = "rgb(13, 202, 240)";
  const badge = (
    <Badge
      bg={backgroundColor}
      style={{
        backgroundColor: backgroundColor,
        color: foregroundColor,
        margin: "4px",
        padding: "8px",
        cursor: onClick ? "pointer" : "default",
        boxShadow: isPlayingThemeOccurrence
          ? "0px 0px 6px " + playingColor
          : isPlayingTheme && onClick
          ? "0px 0px 6px " + relatedColor
          : undefined,
        border:
          "3px solid " +
          (isPlayingThemeOccurrence ? playingColor : isPlayingTheme && onClick ? relatedColor : backgroundColor),
      }}
      onClick={onClick}
    >
      {theme.title}
    </Badge>
  );
  return (
    <TooltipWrapper
      tooltip={
        isPlayingThemeOccurrence
          ? "Current theme"
          : isPlayingTheme && onClick
          ? "Another occurrence of the current theme"
          : undefined
      }
    >
      {badge}
    </TooltipWrapper>
  );
}
