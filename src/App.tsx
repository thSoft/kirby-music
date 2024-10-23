import { useState } from "react";
import { Button, Card, Container, Stack } from "react-bootstrap";
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
    return (
      <Container fluid>
        <TrackBrowser />
      </Container>
    );
  }
  const { game: currentGame, track: currentTrack } = currentGameAndTrack;

  const onTimeChanged = (currentTime: number) => {
    if (!currentTrack) return;
    const newSectionIndex = getSectionIndex(currentTrack, currentTime);
    if (currentSectionIndex !== newSectionIndex) {
      const currentSection = currentTrack.sections[newSectionIndex];
      update(currentTrackId, newSectionIndex, start, currentSection ? currentSection.themeIds[0] : undefined);
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
    <Container fluid>
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
          <Card style={{ width: "100%" }}>
            <Card.Header>
              <SectionsView track={currentTrack} />
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
    </Container>
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

export default App;
