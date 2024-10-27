import { Options } from "youtube-player/dist/types";
import { KeyChange, Track } from "./data";
import { getSectionIndex, usePlayingInfo } from "./utils";
import YouTubeVideo from "./YouTubeVideo";

export function VideoPlayer({
  currentTrack,
  setCurrentKeyChange,
}: {
  currentTrack: Track;
  setCurrentKeyChange: (keyChange: KeyChange | undefined) => void;
}) {
  const { currentTrackId, currentSectionIndex, start, update } = usePlayingInfo();
  const onTimeChanged = (currentTime: number) => {
    if (!currentTrack) return;
    const newSectionIndex = getSectionIndex(currentTrack, currentTime);
    if (currentSectionIndex !== newSectionIndex) {
      const newSection = currentTrack.sections[newSectionIndex];
      update(currentTrackId, newSectionIndex, start, newSection ? newSection.themeIds[0] : undefined);
    }

    setCurrentKeyChange(getCurrentKeyChange(currentTrack, currentTime));
  };

  const opts: Options = {
    width: videoWidth,
    height: videoWidth * 0.5625,
    playerVars: {
      autoplay: 1,
      start: start,
      end: currentTrack?.duration,
    },
  };
  return (
    <YouTubeVideo
      videoId={currentTrack?.videoId || ""}
      onTimeChanged={onTimeChanged}
      opts={opts}
      style={{ display: "inline-flex", borderRadius: "5px", overflow: "hidden" }}
    />
  );
}

export const videoWidth = 400;

function getCurrentKeyChange(currentTrack: Track, currentTime: number) {
  return currentTrack.keyChanges?.find(
    (keyChange, i, keyChanges) =>
      currentTime >= keyChange.start && (i + 1 === keyChanges.length || currentTime < keyChanges[i + 1].start)
  );
}
