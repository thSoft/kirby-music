import { useEffect, useRef, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useInterval } from "usehooks-ts";
import { Options } from "youtube-player/dist/types";

function YouTubeVideo({
  videoId,
  onTimeChanged,
  opts,
}: {
  videoId: string;
  onTimeChanged?: (currentTime: number) => void;
  opts?: Options;
}) {
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [playing, setPlaying] = useState(false);
  const previousVideoId = useRef(videoId);

  // Update the current time
  useInterval(
    async () => {
      if (player) {
        const time = await player.getCurrentTime();
        const end = opts?.playerVars?.end;
        if (end && time >= end) {
          player.pauseVideo();
        } else {
          if (onTimeChanged && time !== undefined) onTimeChanged(time);
        }
      }
    },
    player && playing && previousVideoId.current === videoId ? 50 : null
  );

  // Check if the videoId has changed
  useEffect(() => {
    if (previousVideoId.current !== videoId) {
      previousVideoId.current = videoId;
    }
  }, [videoId]);

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={(event) => {
        setPlayer(event.target);
        const start = opts?.playerVars?.start;
        if (start !== undefined) {
          setPlaying(false);
          event.target.seekTo(start, true);
        }
      }}
      onStateChange={(event) => {
        setPlaying(event.data == YouTube.PlayerState.PLAYING);
      }}
    />
  );
}

export default YouTubeVideo;
