import invert from "invert-color";
import { useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useInterval } from "usehooks-ts";
import { colors, games, themes } from "./data";

function App() {
  const [currentVideoId, setCurrentVideoId] = useState("");
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentThemeId, setCurrentThemeId] = useState("");
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [playing, setPlaying] = useState<boolean>(false);

  useInterval(async () => await checkPlaybackTime(), playing ? 100 : null);

  return (
    <>
      <div id="player">
        <YouTube
          opts={{ width: 400, height: 320 }}
          onReady={(event) => setPlayer(event.target)}
          onStateChange={(event) => {
            return setPlaying(event.data == YouTube.PlayerState.PLAYING);
          }}
        />
      </div>

      <div id="games">
        {games.map((game) => {
          const isCurrentGame = game.tracks.some(
            (track) => track.videoId == currentVideoId
          );
          return (
            <div className="game" key={game.title}>
              <h2
                style={{
                  color: isCurrentGame ? "black" : "gray",
                }}
              >
                {game.title}
              </h2>
              <div className="tracks">
                {game.tracks.map((track) => {
                  const isCurrentTrack = track.videoId == currentVideoId;
                  return (
                    <div className="track" key={track.videoId}>
                      <h3
                        style={{
                          color: isCurrentTrack ? "black" : "gray",
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
                        {track.sections.map((section, sectionIndex) => {
                          const isCurrentSection =
                            isCurrentTrack &&
                            currentSectionIndex == sectionIndex;
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
                              {section.themes.map((themeId, i) => {
                                const themeIndex = themes.findIndex(
                                  (theme) => theme.id === themeId
                                );
                                const theme = themes[themeIndex];
                                const backgroundColor = colors[themeIndex];
                                const foregroundColor = invert(
                                  backgroundColor,
                                  true
                                );
                                const isCurrentTheme =
                                  currentThemeId == themeId;
                                const isCurrent =
                                  isCurrentSection && isCurrentTheme;
                                return (
                                  <div
                                    className="theme"
                                    key={i}
                                    style={{
                                      backgroundColor: backgroundColor,
                                      color: foregroundColor,
                                      textAlign: "center",
                                      borderRadius: "10px",
                                      margin: "5px",
                                      padding: "10px",
                                      cursor: "pointer",
                                      opacity: isCurrentTheme ? 1 : 0.3,
                                      boxShadow: isCurrent
                                        ? "0px 0px 6px black"
                                        : undefined,
                                      border:
                                        "1px solid " +
                                        (isCurrent ? "black" : backgroundColor),
                                    }}
                                    onClick={() => {
                                      setCurrentSectionIndex(sectionIndex);
                                      setCurrentThemeId(themeId);
                                      if (currentVideoId == track.videoId) {
                                        player?.seekTo(section.start, true);
                                      } else {
                                        setCurrentVideoId(track.videoId);
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
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  async function checkPlaybackTime() {
    if (!player) return;

    const currentTime = await player.getCurrentTime();

    // Find the current track and section based on the time
    const foundTrack = games
      .flatMap((game) => game.tracks)
      .find((track) => track.videoId === currentVideoId);
    if (!foundTrack) return;

    const foundSectionIndex = foundTrack.sections.findIndex(
      (section, i, sections) =>
        currentTime >= section.start &&
        (i + 1 === sections.length || currentTime < sections[i + 1].start)
    );

    if (foundSectionIndex !== -1 && foundSectionIndex !== currentSectionIndex) {
      setCurrentSectionIndex(foundSectionIndex);
      const foundSection = foundTrack.sections[foundSectionIndex];
      setCurrentThemeId(foundSection.themes[0]);
    }
  }
}

export default App;
