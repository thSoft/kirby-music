import { useState } from "react";
import { Button, Card, Col, Container, Stack } from "react-bootstrap";
import { Options } from "youtube-player/dist/types";
import { games, KeyChange, Track } from "./data";
import { KeyView } from "./KeyView";
import { SectionsView } from "./SectionsView";
import { ThemeScore } from "./ThemeScore";
import { TrackBrowser } from "./TrackBrowser";
import { getSectionIndex, playingInfoWidth, usePlayingInfo } from "./utils";
import YouTubeVideo from "./YouTubeVideo";

function App() {
  const { currentTrackId, currentSectionIndex, start, update } = usePlayingInfo();
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
      const currentSection = currentTrack.sections[newSectionIndex];
      update(currentTrackId, newSectionIndex, start, currentSection ? currentSection.themeIds[0] : undefined);
    }

    setCurrentKeyChange(getCurrentKeyChange(currentTrack, currentTime));
  };
  const opts: Options = {
    width: playingInfoWidth,
    height: playingInfoWidth * 0.5625,
    playerVars: {
      autoplay: 1,
      start: start,
      end: currentTrack?.duration,
    },
  };

  return (
    <Container fluid>
      <Card body>
        <h4 style={{ textAlign: "center" }}>
          {currentGame.title} &gt; {currentTrack.title}&nbsp;
          <Button onClick={() => update()}>Choose another track</Button>
        </h4>
        <Stack direction="horizontal">
          <YouTubeVideo videoId={currentTrack?.videoId || ""} onTimeChanged={onTimeChanged} opts={opts} />
          <Col>
            <Stack>
              <SectionsView track={currentTrack} />
              <ThemeScore />
              <KeyView keySignature={currentKeyChange?.key} />
            </Stack>
          </Col>
        </Stack>
      </Card>
      <TrackBrowser showOnlyRelated />
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
  return games
    .flatMap((game) => game.tracks.map((track) => ({ game, track })))
    .find(({ track }) => track.id === trackId);
}

export default App;
