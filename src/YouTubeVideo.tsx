import { useEffect, useRef, useState } from "react";
import { useKey } from "react-use";
import YouTube, { YouTubePlayer } from "react-youtube";
import { useInterval } from "usehooks-ts";
import { Options } from "youtube-player/dist/types";

function YouTubeVideo({
  videoId,
  onTimeChanged,
  opts,
  style,
}: {
  videoId: string;
  onTimeChanged?: (currentTime: number) => void;
  opts?: Options;
  style?: React.CSSProperties;
}) {
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [playing, setPlaying] = useState(false);
  const start = opts?.playerVars?.start;
  const end = opts?.playerVars?.end;
  const previousVideoId = useRef(videoId);
  const previousStart = useRef(start);

  // Update the current time
  useInterval(
    async () => {
      if (player) {
        const time = await player.getCurrentTime();
        if (end !== undefined && time >= end) {
          player.pauseVideo();
        } else {
          if (onTimeChanged && time) onTimeChanged(time);
        }
      }
    },
    // Only update if playback continues
    player && playing && previousVideoId.current === videoId && previousStart.current === start ? 50 : null
  );

  // Check if seeked or loaded new video
  useEffect(() => {
    if (previousVideoId.current !== videoId) {
      previousVideoId.current = videoId;
    }
    if (previousStart.current !== start) {
      previousStart.current = start;
    }
  }, [videoId, opts]);

  // Global keyboard handler
  useKey(
    " ",
    async () => {
      if (player) {
        if ((await player.getPlayerState()) == YouTube.PlayerState.PLAYING) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }
      }
    },
    undefined,
    [player]
  );

  return (
    <YouTube
      videoId={videoId}
      style={style}
      opts={opts}
      onReady={(event) => {
        setPlayer(event.target);
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
