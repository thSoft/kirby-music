import invert from "invert-color";
import pluralize from "pluralize";
import { ReactElement, ReactNode, useState } from "react";
import { Badge, Card, Col, Container, Form, Nav, OverlayTrigger, Row, Stack, Tooltip } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useInterval } from "usehooks-ts";
import AbcScore from "./AbcScore";
import { colors, Game, games, Section, Theme, themes, Track } from "./data";

function App() {
  const location = useLocation();

  const [playingVideoId, setPlayingVideoId] = useState("");
  const [playingSectionIndex, setPlayingSectionIndex] = useState(0);
  const [playingThemeId, setPlayingThemeId] = useState("");
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [showOnlyRelated, setShowOnlyRelated] = useState<boolean>(false);

  useInterval(async () => await checkPlaybackTime(), playing ? 100 : null);

  const viewingGame = location.hash
    ? games.find((game) => game.id == location.hash.substring(1)) ?? games[0]
    : games[0];

  const playingGame = games.find((game) => game.tracks.some((track) => track.videoId == playingVideoId));
  const playingTrack = playingGame?.tracks.find((track) => track.videoId == playingVideoId);
  const playingTheme = themes.find((theme) => theme.id === playingThemeId);

  const playingInfoWidth = 400;

  return (
    <Container fluid>
      <Row>
        <Col md="auto">{Sidebar()}</Col>
        <Col>{GameDetails()}</Col>
      </Row>
    </Container>
  );

  function Sidebar() {
    return (
      <Nav variant="pills" style={{ position: "sticky", top: 0 }}>
        <Stack style={{ width: playingInfoWidth + 16 }} gap={3}>
          <Card body style={{ marginTop: "1em" }}>
            {PlayingGame()}
            {PlayingTrack()}
            {VideoPlayer()}
            {PlayingTheme()}
          </Card>
          <Stack>{games.map(GameLink)}</Stack>
        </Stack>
      </Nav>
    );
  }

  function PlayingGame() {
    return (
      <Stack direction="horizontal" gap={1}>
        Game:
        {playingGame ? <a href={`#${playingGame.id}`}>{playingGame.title}</a> : <span>-</span>}
      </Stack>
    );
  }

  function PlayingTrack() {
    return (
      <Stack direction="horizontal" gap={1}>
        Track:
        <span>{playingTrack ? playingTrack.title : "-"}</span>
      </Stack>
    );
  }

  function VideoPlayer() {
    return (
      <YouTube
        opts={{ width: playingInfoWidth, height: playingInfoWidth * 0.5625 }}
        onReady={(event) => setPlayer(event.target)}
        onStateChange={(event) => {
          return setPlaying(event.data == YouTube.PlayerState.PLAYING);
        }}
      />
    );
  }

  function PlayingTheme() {
    return (
      <Stack>
        <Stack direction="horizontal" gap={1}>
          Theme:
          {playingTheme ? <ThemeBadge theme={playingTheme} isPlayingTheme /> : <span>-</span>}
        </Stack>
        <Form.Check
          id="check"
          checked={showOnlyRelated}
          onChange={(event) => setShowOnlyRelated(event.target.checked)}
          label="Show only tracks containing this theme"
        />
        {playingTheme?.score && <AbcScore abc={playingTheme?.score} width={playingInfoWidth} />}
      </Stack>
    );
  }

  function sum(array: number[]) {
    return array.reduce((a, b) => a + b, 0);
  }

  function countThemesInSection(section: Section) {
    return sum(section.themeIds.map((themeId) => (themeId == playingThemeId ? 1 : 0)));
  }

  function countThemesInTrack(track: Track) {
    return sum(track.sections.map((section) => countThemesInSection(section)));
  }

  function GameLink(game: Game) {
    const isViewingGame = game.id == viewingGame.id;
    const themeOccurrenceCount = sum(game.tracks.map((track) => countThemesInTrack(track)));
    return (
      <Nav.Item key={game.id}>
        <Nav.Link
          active={isViewingGame}
          href={`#${game.id}`}
          style={showOnlyRelated && themeOccurrenceCount == 0 ? { color: "gray" } : {}}
        >
          {game.title}
          {playingGame == game && <PlayingBadge />}
          {themeOccurrenceCount > 0 && CountBadge(themeOccurrenceCount)}
        </Nav.Link>
      </Nav.Item>
    );
  }

  function GameDetails() {
    if (!viewingGame) return;
    const isPlayingGame = viewingGame.tracks.some((track) => track.videoId == playingVideoId);
    return (
      <div>
        <h3
          style={{
            color: isPlayingGame ? "black" : "gray",
            textAlign: "center",
            marginTop: "0.4em",
          }}
        >
          {viewingGame.title}
        </h3>
        <Stack gap={1}>
          {viewingGame.tracks.filter((track) => !showOnlyRelated || countThemesInTrack(track) > 0).map(Track)}
        </Stack>
      </div>
    );
  }

  function Track(track: Track) {
    return (
      <Card key={track.videoId} body border={isPlayingTrack(track) ? "dark" : "light"}>
        <Card.Title
          style={{
            color: isPlayingTrack(track) ? "black" : "gray",
            display: "inline",
          }}
        >
          {track.title}
          {isPlayingTrack(track) && <PlayingBadge />}
        </Card.Title>
        <Container fluid>
          <Row>{track.sections.map((section, sectionIndex) => Section(section, sectionIndex, track))}</Row>
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
            ThemeOccurrence(themeId, themeOccurrenceIndex, section, sectionIndex, track)
          )}
        </Stack>
      </Col>
    );
  }

  function ThemeOccurrence(
    themeId: string,
    themeOccurrenceIndex: number,
    section: Section,
    sectionIndex: number,
    track: Track
  ) {
    const theme = themes.find((theme) => theme.id === themeId);
    if (!theme) return;
    const isPlayingTheme = playingThemeId == themeId;
    const isPlayingThemeOccurrence = isPlayingTrack(track) && playingSectionIndex == sectionIndex && isPlayingTheme;
    const onClick = function () {
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

  async function checkPlaybackTime() {
    if (!player) return;

    const currentTime = await player.getCurrentTime();

    const foundTrack = games.flatMap((game) => game.tracks).find((track) => track.videoId === playingVideoId);
    if (!foundTrack) return;

    const foundSectionIndex = foundTrack.sections.findIndex(
      (section, i, sections) =>
        currentTime >= section.start && (i + 1 === sections.length || currentTime < sections[i + 1].start)
    );

    if (foundSectionIndex !== -1 && foundSectionIndex !== playingSectionIndex) {
      setPlayingSectionIndex(foundSectionIndex);
      const foundSection = foundTrack.sections[foundSectionIndex];
      setPlayingThemeId(foundSection.themeIds[0]);
    }
  }
}

export default App;

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
  const badge = (
    <Badge
      bg={backgroundColor}
      style={{
        backgroundColor: backgroundColor,
        color: foregroundColor,
        margin: "4px",
        padding: "8px",
        cursor: onClick ? "pointer" : "default",
        opacity: isPlayingTheme ? 1 : 0.5,
        boxShadow: isPlayingThemeOccurrence ? "0px 0px 6px black" : undefined,
        border:
          "1px solid " +
          (isPlayingThemeOccurrence ? "black" : isPlayingTheme && onClick ? "rgb(13, 202, 240)" : backgroundColor),
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
          ? "Currently playing theme"
          : isPlayingTheme && onClick
          ? "Another occurrence of the currently playing theme"
          : undefined
      }
    >
      {badge}
    </TooltipWrapper>
  );
}

function TooltipWrapper({ children, tooltip }: { children: ReactElement; tooltip: string | undefined }) {
  return tooltip ? <OverlayTrigger overlay={<Tooltip>{tooltip}</Tooltip>}>{children}</OverlayTrigger> : children;
}

function CountBadge(themeOccurrenceCount: number) {
  return (
    <BadgeWrapper>
      <TooltipWrapper tooltip={`${pluralize("occurrence", themeOccurrenceCount, true)} of the currently playing theme`}>
        <Badge pill bg="info" style={{ fontSize: "x-small" }}>
          {themeOccurrenceCount}
        </Badge>
      </TooltipWrapper>
    </BadgeWrapper>
  );
}

function PlayingBadge() {
  return (
    <BadgeWrapper>
      <Badge pill bg="dark" style={{ fontSize: "x-small" }}>
        Playing
      </Badge>
    </BadgeWrapper>
  );
}

function BadgeWrapper({ children }: { children: ReactNode }) {
  return <span style={{ lineHeight: "90%", verticalAlign: "text-top" }}> {children}</span>;
}
