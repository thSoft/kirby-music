import invert from "invert-color";
import { useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useInterval } from "usehooks-ts";
import { colors, Game, games, Section, themes, Track } from "./data";

function App() {
  const [playingVideoId, setPlayingVideoId] = useState("");
  const [playingSectionIndex, setPlayingSectionIndex] = useState(0);
  const [playingThemeId, setPlayingThemeId] = useState("");
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [playing, setPlaying] = useState<boolean>(false);

  useInterval(async () => await checkPlaybackTime(), playing ? 100 : null);

  return (
    <>
      {VideoPlayer()}
      <div id="games">{games.map(Game)}</div>
    </>
  );

  function VideoPlayer() {
    return (
      <div id="player">
        <YouTube
          opts={{ width: 400, height: 320 }}
          onReady={(event) => setPlayer(event.target)}
          onStateChange={(event) => {
            return setPlaying(event.data == YouTube.PlayerState.PLAYING);
          }}
        />
      </div>
    );
  }

  function Game(game: Game) {
    const isPlayingGame = game.tracks.some(
      (track) => track.videoId == playingVideoId
    );
    return (
      <div className="game" key={game.id}>
        <h2
          style={{
            color: isPlayingGame ? "black" : "gray",
          }}
        >
          {game.title}
        </h2>
        <div className="tracks">{game.tracks.map(Track)}</div>
      </div>
    );
  }

  function Track(track: Track) {
    return (
      <div className="track" key={track.videoId}>
        <h3
          style={{
            color: isPlayingTrack(track) ? "black" : "gray",
            marginBottom: 5,
          }}
        >
          {track.title}
        </h3>
        <div
          className="sections"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          {track.sections.map((section, sectionIndex) =>
            Section(section, sectionIndex, track)
          )}
        </div>
      </div>
    );
  }

  function isPlayingTrack(track: Track) {
    return track.videoId == playingVideoId;
  }

  function Section(section: Section, sectionIndex: number, track: Track) {
    return (
      <div
        className="section"
        key={sectionIndex}
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {section.themeIds.map((themeId, themeAppearanceIndex) =>
          Theme(themeId, themeAppearanceIndex, section, sectionIndex, track)
        )}
      </div>
    );
  }

  function Theme(
    themeId: string,
    themeAppearanceIndex: number,
    section: Section,
    sectionIndex: number,
    track: Track
  ) {
    const themeIndex = themes.findIndex((theme) => theme.id === themeId);
    const theme = themes[themeIndex];
    const backgroundColor = colors[themeIndex];
    const foregroundColor = invert(backgroundColor, true);
    const isPlayingTheme = playingThemeId == themeId;
    const isPlayingThemeAppearance =
      isPlayingTrack(track) &&
      playingSectionIndex == sectionIndex &&
      isPlayingTheme;
    return (
      <div
        className="theme"
        key={themeAppearanceIndex}
        style={{
          backgroundColor: backgroundColor,
          color: foregroundColor,
          textAlign: "center",
          borderRadius: "10px",
          margin: "5px",
          padding: "10px",
          cursor: "pointer",
          opacity: isPlayingTheme ? 1 : 0.3,
          boxShadow: isPlayingThemeAppearance ? "0px 0px 6px black" : undefined,
          border:
            "1px solid " +
            (isPlayingThemeAppearance ? "black" : backgroundColor),
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
      </div>
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
