import pluralize from "pluralize";
import { ReactNode } from "react";
import { Badge, Card, Col, Nav, Row, Stack } from "react-bootstrap";
import { Game, games, Section, Track } from "./data";
import { SectionsView } from "./SectionsView";
import { TooltipWrapper } from "./TooltipWrapper";
import { sum, usePlayingInfo } from "./utils";

export function TrackBrowser({ showOnlyRelated = false }: { showOnlyRelated?: boolean }) {
  const { currentThemeId } = usePlayingInfo();
  const visibleGames =
    showOnlyRelated && currentThemeId ? games.filter((game) => countThemesInGame(game, currentThemeId) > 0) : games;
  return (
    <Card body>
      <Row>
        <h2 style={{ textAlign: "center" }}>
          {showOnlyRelated ? "Tracks containing the current theme" : "All tracks"}
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

function countThemesInSection(section: Section, currentThemeId: string) {
  return sum(section.themeIds.map((themeId) => (themeId == currentThemeId ? 1 : 0)));
}

function countThemesInTrack(track: Track, currentThemeId: string) {
  return sum(track.sections.map((section) => countThemesInSection(section, currentThemeId)));
}

function countThemesInGame(game: Game, currentThemeId: string) {
  return sum(game.tracks.map((track) => countThemesInTrack(track, currentThemeId)));
}

function GameLink({ game }: { game: Game }) {
  const { currentThemeId } = usePlayingInfo();
  const themeOccurrenceCount = currentThemeId ? countThemesInGame(game, currentThemeId) : 0;
  return (
    <Nav.Item key={game.id}>
      <Nav.Link href={`#${game.id}`}>
        {game.title}
        {themeOccurrenceCount > 0 && CountBadge(themeOccurrenceCount)}
      </Nav.Link>
    </Nav.Item>
  );
}

function GameDetails({ game, showOnlyRelated }: { game: Game; showOnlyRelated: boolean }) {
  const { currentThemeId } = usePlayingInfo();
  const visibleTracks =
    showOnlyRelated && currentThemeId
      ? game.tracks.filter((track) => countThemesInTrack(track, currentThemeId) > 0)
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
    <Card body border="dark">
      <Card.Title style={{ margin: 1 }}>{track.title}</Card.Title>
      <SectionsView track={track} />
    </Card>
  );
}

function CountBadge(themeOccurrenceCount: number) {
  return (
    <BadgeWrapper>
      <TooltipWrapper tooltip={`${pluralize("occurrence", themeOccurrenceCount, true)} of the current theme`}>
        <Badge pill bg="info" style={{ fontSize: "x-small" }}>
          {themeOccurrenceCount}
        </Badge>
      </TooltipWrapper>
    </BadgeWrapper>
  );
}

function BadgeWrapper({ children }: { children: ReactNode }) {
  return <span style={{ lineHeight: "90%", verticalAlign: "text-top" }}> {children}</span>;
}
