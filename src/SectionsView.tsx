import distinctColors from "distinct-colors";
import invert from "invert-color";
import { Badge, Col, Stack } from "react-bootstrap";
import { Section, themes, Track } from "./data";
import { TooltipWrapper } from "./TooltipWrapper";
import { getSectionIndex, getTheme, usePlayingInfo } from "./utils";

export function SectionsView({ track }: { track: Track }) {
  return (
    <Stack direction="horizontal" style={{ alignItems: "start", flexWrap: "wrap", rowGap: 8 }}>
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
        {section.themeIds.map((themeId) => (
          <ThemeOccurrence
            themeId={themeId}
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
  section,
  sectionIndex,
  track,
}: {
  themeId: string;
  section: Section;
  sectionIndex: number;
  track: Track;
}) {
  const { currentTrackId, currentThemeId, currentSectionIndex, update } = usePlayingInfo();
  if (!track) return;
  const theme = getTheme(themeId);
  if (!theme) return;
  const isSameTheme = currentThemeId == themeId;
  const isCurrentThemeOccurrence = currentTrackId == track.id && currentSectionIndex == sectionIndex && isSameTheme;
  const onClick = function () {
    update(track.id, getSectionIndex(track, section.start), section.start, themeId);
  };
  const themeIndex = themes.indexOf(theme);
  const backgroundColor = colors[themeIndex].hex();
  const foregroundColor = invert(backgroundColor, true);
  return (
    <TooltipWrapper
      tooltip={
        isCurrentThemeOccurrence
          ? "Current theme occurrence"
          : isSameTheme
          ? "Another occurrence of the current theme"
          : undefined
      }
    >
      <Badge
        bg={backgroundColor}
        style={{
          backgroundColor: backgroundColor,
          color: foregroundColor,
          margin: "4px",
          padding: "8px",
          cursor: "pointer",
          borderWidth: "3px",
          borderStyle: isCurrentThemeOccurrence ? "solid" : isSameTheme ? "dashed" : "solid",
          borderColor: isCurrentThemeOccurrence ? "#FFFF8F" : isSameTheme ? foregroundColor : backgroundColor,
          boxShadow: isCurrentThemeOccurrence ? "0px 0px 6px black" : isSameTheme ? "0px 0px 4px gray" : undefined,
        }}
        onClick={onClick}
      >
        {theme.title}
      </Badge>
    </TooltipWrapper>
  );
}

const colors = distinctColors({ count: themes.length });
