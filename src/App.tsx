import { useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { useKey } from "react-use";
import { Options } from "youtube-player/dist/types";
import { KeyChange, Track } from "./data";
import { KeyView } from "./KeyView";
import { SectionsView } from "./SectionsView";
import { ThemeScore } from "./ThemeScore";
import { TrackBrowser } from "./TrackBrowser";
import { getAllTracksWithGame, getSectionIndex, rootCardStyle, usePlayingInfo } from "./utils";
import YouTubeVideo from "./YouTubeVideo";

function App() {
  const { currentTrackId, currentSectionIndex, currentThemeId, start, update } = usePlayingInfo();
  const [currentKeyChange, setCurrentKeyChange] = useState<KeyChange>();

  const currentGameAndTrack = getCurrentGameAndTrack(currentTrackId);
  if (!currentGameAndTrack) {
    return <TrackBrowser />;
  }
  const { game: currentGame, track: currentTrack } = currentGameAndTrack;

  const onTimeChanged = (currentTime: number) => {
    if (!currentTrack) return;
    const newSectionIndex = getSectionIndex(currentTrack, currentTime);
    if (currentSectionIndex !== newSectionIndex) {
      const newSection = currentTrack.sections[newSectionIndex];
      update(currentTrackId, newSectionIndex, start, newSection ? newSection.themeIds[0] : undefined);
    }

    setCurrentKeyChange(getCurrentKeyChange(currentTrack, currentTime));
  };
  const videoWidth = 400;
  const opts: Options = {
    width: videoWidth,
    height: videoWidth * 0.5625,
    playerVars: {
      autoplay: 1,
      start: start,
      end: currentTrack?.duration,
    },
  };

  return (
    <>
      <Card body style={rootCardStyle}>
        <Stack direction="horizontal" style={{ alignItems: "start" }}>
          <Button onClick={() => update()}>Change track</Button>
          <h2 style={{ textAlign: "center", flexGrow: 1 }}>
            {currentGame.title} › {currentTrack.title}&nbsp;
          </h2>
          {currentTrack.url && (
            <Button onClick={() => window.open(currentTrack.url, "_blank")} variant="secondary">
              More info
            </Button>
          )}
        </Stack>
        <Stack direction="horizontal" gap={1}>
          <YouTubeVideo
            videoId={currentTrack?.videoId || ""}
            onTimeChanged={onTimeChanged}
            opts={opts}
            style={{ display: "inline-flex", borderRadius: "5px", overflow: "hidden" }}
          />
          <Card style={{ width: `calc(100% - ${videoWidth}px)` }}>
            <Card.Header>
              <SectionsView track={currentTrack} />
              <KeyboardHandler currentTrack={currentTrack} />
            </Card.Header>
            <Card.Body>
              <ThemeScore />
            </Card.Body>
            <Card.Footer>
              <KeyView keySignature={currentKeyChange?.key} />
            </Card.Footer>
          </Card>
        </Stack>
      </Card>
      {currentThemeId && <TrackBrowser showOnlyRelated />}
    </>
  );
}

function getCurrentKeyChange(currentTrack: Track, currentTime: number) {
  return currentTrack.keyChanges?.find(
    (keyChange, i, keyChanges) =>
      currentTime >= keyChange.start && (i + 1 === keyChanges.length || currentTime < keyChanges[i + 1].start)
  );
}

function getCurrentGameAndTrack(trackId: string | undefined) {
  return getAllTracksWithGame().find(({ track }) => track.id === trackId);
}

function KeyboardHandler({ currentTrack }: { currentTrack: Track }) {
  const { currentTrackId, currentSectionIndex, currentThemeId, start, update } = usePlayingInfo();
  const currentSection = currentTrack.sections[currentSectionIndex];
  const currentThemeOccurrenceIndex = currentThemeId ? currentSection.themeIds.indexOf(currentThemeId) : undefined;

  function moveSectionBy(delta: number, event: KeyboardEvent) {
    if (hasModifier(event)) {
      return;
    }
    const newSectionIndex = currentSectionIndex + delta;
    if (newSectionIndex >= 0 && newSectionIndex < currentTrack.sections.length) {
      const newSection = currentTrack.sections[newSectionIndex];
      update(currentTrackId, newSectionIndex, newSection.start, newSection.themeIds[0]);
    }
  }

  function moveThemeOccurrenceBy(delta: number, event: KeyboardEvent) {
    if (hasModifier(event)) {
      return;
    }
    if (currentThemeOccurrenceIndex === undefined) return;
    const newThemeOccurrenceIndex = currentThemeOccurrenceIndex + delta;
    if (newThemeOccurrenceIndex >= 0 && newThemeOccurrenceIndex < currentSection.themeIds.length) {
      const newThemeId = currentSection.themeIds[newThemeOccurrenceIndex];
      update(currentTrackId, currentSectionIndex, start, newThemeId);
    }
  }

  const sectionDeps = [currentTrack, currentSectionIndex];
  useKey("ArrowLeft", (event) => moveSectionBy(-1, event), undefined, sectionDeps);
  useKey("ArrowRight", (event) => moveSectionBy(+1, event), undefined, sectionDeps);

  const themeDeps = [currentSection, currentThemeOccurrenceIndex];
  useKey("ArrowUp", (event) => moveThemeOccurrenceBy(-1, event), undefined, themeDeps);
  useKey("ArrowDown", (event) => moveThemeOccurrenceBy(+1, event), undefined, themeDeps);

  return null;
}

function hasModifier(event: KeyboardEvent) {
  return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}

export default App;
