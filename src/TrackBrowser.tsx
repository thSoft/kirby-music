import { ReactNode } from "react";
import { Badge, Card, Col, Nav, Row, Stack } from "react-bootstrap";
import { Game, games, Track } from "./data";
import { SectionsView } from "./SectionsView";
import { TooltipWrapper } from "./TooltipWrapper";
import { getAllTracksWithGame, sum, usePlayingInfo } from "./utils";

export function TrackBrowser({ showOnlyRelated = false }: { showOnlyRelated?: boolean }) {
  const { currentTrackId, currentThemeId } = usePlayingInfo();
  const visibleGames =
    showOnlyRelated && currentTrackId && currentThemeId
      ? games.filter((game) => countRelatedTracksInGame(game, currentTrackId, currentThemeId) > 0)
      : games;
  return (
    <Card body>
      <Row>
        <h2 style={{ textAlign: "center" }}>
          {showOnlyRelated ? "Other tracks containing the current theme" : "All tracks"}
          <BadgeWrapper>
            <CountBadge
              count={
                showOnlyRelated && currentTrackId && currentThemeId
                  ? countRelatedTracks(currentTrackId, currentThemeId)
                  : getAllTracksWithGame().length
              }
            />
          </BadgeWrapper>
        </h2>
      </Row>
      <Row>
        <Col md={3}>
          <Nav variant="pills">
            <Stack>
              {visibleGames.map((game) => (
                <GameLink game={game} key={game.id} />
              ))}
            </Stack>
          </Nav>
        </Col>
        <Col>
          {visibleGames.map((game) => (
            <GameDetails game={game} showOnlyRelated={showOnlyRelated} key={game.id} />
          ))}
        </Col>
      </Row>
    </Card>
  );
}

function countRelatedTracks(currentTrackId: string, currentThemeId: string) {
  return sum(games.map((game) => countRelatedTracksInGame(game, currentTrackId, currentThemeId)));
}

function countRelatedTracksInGame(game: Game, currentTrackId: string, currentThemeId: string) {
  return sum(game.tracks.map((track) => (isRelatedTrack(track, currentTrackId, currentThemeId) ? 1 : 0)));
}

function isRelatedTrack(track: Track, currentTrackId: string, currentThemeId: string) {
  return track.id !== currentTrackId && track.sections.some((section) => section.themeIds.includes(currentThemeId));
}

function GameLink({ game }: { game: Game }) {
  return (
    <Nav.Item key={game.id}>
      <Nav.Link href={`#${game.id}`}>{game.title}</Nav.Link>
    </Nav.Item>
  );
}

function GameDetails({ game, showOnlyRelated }: { game: Game; showOnlyRelated: boolean }) {
  const { currentTrackId, currentThemeId } = usePlayingInfo();
  const visibleTracks =
    showOnlyRelated && currentTrackId && currentThemeId
      ? game.tracks.filter((track) => isRelatedTrack(track, currentTrackId, currentThemeId))
      : game.tracks;
  return (
    <div>
      <a id={game.id} />
      <h3
        style={{
          textAlign: "center",
          marginTop: "0.4em",
        }}
      >
        <a id={game.id} />
        {game.title}
      </h3>
      <Stack gap={1}>
        {visibleTracks.map((track) => (
          <TrackView track={track} key={track.id} />
        ))}
      </Stack>
    </div>
  );
}

function TrackView({ track }: { track: Track }) {
  return (
    <Card body>
      <Card.Title style={{ margin: 1 }}>{track.title}</Card.Title>
      <SectionsView track={track} />
    </Card>
  );
}

function CountBadge({ count }: { count: number }) {
  return (
    <BadgeWrapper>
      <TooltipWrapper tooltip={`${count} tracks`} placement="right">
        <Badge pill bg="info" style={{ fontSize: "x-small" }}>
          {count}
        </Badge>
      </TooltipWrapper>
    </BadgeWrapper>
  );
}

function BadgeWrapper({ children }: { children: ReactNode }) {
  return <span style={{ lineHeight: "90%", verticalAlign: "text-top" }}> {children}</span>;
}
