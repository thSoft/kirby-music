import invert from "invert-color";
import pluralize from "pluralize";
import { ReactNode, useState } from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  Nav,
  OverlayTrigger,
  Row,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useInterval } from "usehooks-ts";
import { colors, Game, games, Section, themes, Track } from "./data";

function App() {
  const location = useLocation();

  const [playingVideoId, setPlayingVideoId] = useState("");
  const [playingSectionIndex, setPlayingSectionIndex] = useState(0);
  const [playingThemeId, setPlayingThemeId] = useState("");
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [playing, setPlaying] = useState<boolean>(false);

  useInterval(async () => await checkPlaybackTime(), playing ? 100 : null);

  const viewingGame = location.hash
    ? games.find((game) => game.id == location.hash.substring(1)) ?? games[0]
    : games[0];

  const playingGame = games.find((game) =>
    game.tracks.some((track) => track.videoId == playingVideoId)
  );
  const playingTrack = playingGame?.tracks.find(
    (track) => track.videoId == playingVideoId
  );
  const playingTheme = themes.find((theme) => theme.id === playingThemeId);

  const videoWidth = 400;

  return (
    <Container fluid>
      <Row>
        <Col md="auto">{Sidebar()}</Col>
        <Col>{Game()}</Col>
      </Row>
    </Container>
  );

  function Sidebar() {
    return (
      <Nav variant="pills" style={{ position: "sticky", top: 0 }}>
        <Stack style={{ width: videoWidth + 16 }} gap={3}>
          <Card body>
            <Stack direction="horizontal" gap={1}>
              Game:
              {playingGame ? (
                <a href={`#${playingGame.id}`}>{playingGame.title}</a>
              ) : (
                <span>-</span>
              )}
            </Stack>
            <Stack direction="horizontal" gap={1}>
              Track:
              <span>{playingTrack ? playingTrack.title : "-"}</span>
            </Stack>
            {VideoPlayer()}
            <Stack direction="horizontal" gap={1}>
              Theme:
              <span>{playingTheme ? playingTheme.title : "-"}</span>
            </Stack>
          </Card>
          <div id="game-links">{games.map(GameLink)}</div>
        </Stack>
      </Nav>
    );
  }

  function VideoPlayer() {
    return (
      <div id="player">
        <YouTube
          opts={{ width: videoWidth, height: 320 }}
          onReady={(event) => setPlayer(event.target)}
          onStateChange={(event) => {
            return setPlaying(event.data == YouTube.PlayerState.PLAYING);
          }}
        />
      </div>
    );
  }

  function GameLink(game: Game) {
    const isViewingGame = game.id == viewingGame.id;
    function countThemes(section: Section) {
      return section.themeIds.reduce(
        (sum, themeId) => sum + (themeId == playingThemeId ? 1 : 0),
        0
      );
    }
    function countSections(track: Track) {
      return track.sections.reduce(
        (sum, section) => sum + countThemes(section),
        0
      );
    }
    const themeOccurrenceCount = game.tracks.reduce(
      (sum, track) => sum + countSections(track),
      0
    );
    return (
      <Nav.Item className="game-link" key={game.id}>
        <Nav.Link active={isViewingGame} href={`#${game.id}`}>
          {game.title}
          {playingGame == game && <Playing />}
          {themeOccurrenceCount > 0 && (
            <BadgeWrapper>
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    {pluralize("occurrence", themeOccurrenceCount, true)} of the
                    theme
                  </Tooltip>
                }
              >
                <Badge pill bg="info">
                  {themeOccurrenceCount}
                </Badge>
              </OverlayTrigger>
            </BadgeWrapper>
          )}
        </Nav.Link>
      </Nav.Item>
    );
  }

  function Game() {
    if (!viewingGame) return;
    const isPlayingGame = viewingGame.tracks.some(
      (track) => track.videoId == playingVideoId
    );
    return (
      <div className="game" key={viewingGame.id}>
        <h3
          style={{
            color: isPlayingGame ? "black" : "gray",
          }}
        >
          {viewingGame.title}
        </h3>
        <Stack className="tracks" gap={1}>
          {viewingGame.tracks.map(Track)}
        </Stack>
      </div>
    );
  }

  function Track(track: Track) {
    return (
      <Card
        className="track"
        key={track.videoId}
        body
        border={isPlayingTrack(track) ? "dark" : "light"}
      >
        <Card.Title
          style={{
            color: isPlayingTrack(track) ? "black" : "gray",
            display: "inline",
          }}
        >
          {track.title}
          {isPlayingTrack(track) && <Playing />}
        </Card.Title>
        <Container fluid>
          <Row>
            {track.sections.map((section, sectionIndex) =>
              Section(section, sectionIndex, track)
            )}
          </Row>
        </Container>
      </Card>
    );
  }

  function isPlayingTrack(track: Track) {
    return track.videoId == playingVideoId;
  }

  function Section(section: Section, sectionIndex: number, track: Track) {
    return (
      <Col xs="auto" key={sectionIndex} style={{ padding: 0 }}>
        <Stack gap={0}>
          {section.themeIds.map((themeId, themeOccurrenceIndex) =>
            Theme(themeId, themeOccurrenceIndex, section, sectionIndex, track)
          )}
        </Stack>
      </Col>
    );
  }

  function Theme(
    themeId: string,
    themeOccurrenceIndex: number,
    section: Section,
    sectionIndex: number,
    track: Track
  ) {
    const themeIndex = themes.findIndex((theme) => theme.id === themeId);
    const theme = themes[themeIndex];
    const backgroundColor = colors[themeIndex];
    const foregroundColor = invert(backgroundColor, true);
    const isPlayingTheme = playingThemeId == themeId;
    const isPlayingThemeOccurrence =
      isPlayingTrack(track) &&
      playingSectionIndex == sectionIndex &&
      isPlayingTheme;
    return (
      <Badge
        className="theme"
        key={themeOccurrenceIndex}
        bg={backgroundColor}
        style={{
          backgroundColor: backgroundColor,
          color: foregroundColor,
          margin: "4px",
          padding: "8px",
          cursor: "pointer",
          opacity: isPlayingTheme ? 1 : 0.3,
          boxShadow: isPlayingThemeOccurrence ? "0px 0px 6px black" : undefined,
          border:
            "1px solid " +
            (isPlayingThemeOccurrence ? "black" : backgroundColor),
        }}
        onClick={() => {
          setPlayingSectionIndex(sectionIndex);
          setPlayingThemeId(themeId);
          if (playingVideoId == track.videoId) {
            player?.seekTo(section.start, true);
          } else {
            setPlayingVideoId(track.videoId);
            player?.loadVideoById({
              videoId: track.videoId,
              startSeconds: section.start,
              endSeconds: track.duration,
            });
          }
        }}
      >
        {theme.title}
      </Badge>
    );
  }

  async function checkPlaybackTime() {
    if (!player) return;

    const currentTime = await player.getCurrentTime();

    // Find the current track and section based on the time
    const foundTrack = games
      .flatMap((game) => game.tracks)
      .find((track) => track.videoId === playingVideoId);
    if (!foundTrack) return;

    const foundSectionIndex = foundTrack.sections.findIndex(
      (section, i, sections) =>
        currentTime >= section.start &&
        (i + 1 === sections.length || currentTime < sections[i + 1].start)
    );

    if (foundSectionIndex !== -1 && foundSectionIndex !== playingSectionIndex) {
      setPlayingSectionIndex(foundSectionIndex);
      const foundSection = foundTrack.sections[foundSectionIndex];
      setPlayingThemeId(foundSection.themeIds[0]);
    }
  }
}

export default App;

function Playing() {
  return (
    <BadgeWrapper>
      <Badge pill bg="success" style={{ fontSize: "x-small" }}>
        Playing
      </Badge>
    </BadgeWrapper>
  );
}

function BadgeWrapper({ children }: { children: ReactNode }) {
  return (
    <span style={{ lineHeight: "120%", verticalAlign: "top" }}>
      {" "}
      {children}
    </span>
  );
}
