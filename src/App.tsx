import { useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { KeyChange } from "./data";
import { KeyboardHandler } from "./KeyboardHandler";
import { KeyView } from "./KeyView";
import { SectionsView } from "./SectionsView";
import { ThemeScore } from "./ThemeScore";
import { TrackBrowser } from "./TrackBrowser";
import { getAllTracksWithGame, rootCardStyle, usePlayingInfo } from "./utils";
import { VideoPlayer, videoWidth } from "./VideoPlayer";

function App() {
  const { currentTrackId, currentThemeId, update } = usePlayingInfo();
  const [currentKeyChange, setCurrentKeyChange] = useState<KeyChange>();

  const currentGameAndTrack = getCurrentGameAndTrack(currentTrackId);
  if (!currentGameAndTrack) {
    return <TrackBrowser />;
  }
  const { game: currentGame, track: currentTrack } = currentGameAndTrack;

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
          <VideoPlayer currentTrack={currentTrack} setCurrentKeyChange={setCurrentKeyChange} />
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

function getCurrentGameAndTrack(trackId: string | undefined) {
  return getAllTracksWithGame().find(({ track }) => track.id === trackId);
}

export default App;
