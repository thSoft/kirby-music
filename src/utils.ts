import { useSearchParams } from "react-router-dom";
import { games, themes, Track } from "./data";

export function getAllTracksWithGame() {
  return games.flatMap((game) => game.tracks.map((track) => ({ game, track })));
}

export function getSectionIndex(track: Track, currentTime: number) {
  return track.sections.findIndex(
    (section, i, sections) =>
      currentTime >= section.start && (i + 1 === sections.length || currentTime < sections[i + 1].start)
  );
}

export function getTheme(id: string | undefined) {
  return themes.find((theme) => theme.id === id);
}

export function sum(array: number[]) {
  return array.reduce((a, b) => a + b, 0);
}

export function usePlayingInfo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const TRACK_ID = "trackId";
  const SECTION_INDEX = "sectionIndex";
  const START = "start";
  const THEME_ID = "themeId";
  const currentTrackId = searchParams.get(TRACK_ID) || undefined;
  const currentSectionIndex = parseInt(searchParams.get(SECTION_INDEX) || "0");
  const start = parseFloat(searchParams.get(START) || "0");
  const currentThemeId = searchParams.get(THEME_ID) || undefined;
  const update = (trackId?: string, sectionIndex?: number, start?: number, themeId?: string) =>
    setSearchParams((params) => ({
      ...params,
      ...entry(TRACK_ID, trackId),
      ...entry(SECTION_INDEX, sectionIndex),
      ...entry(START, start),
      ...entry(THEME_ID, themeId),
    }));
  return {
    currentTrackId,
    currentSectionIndex,
    start,
    currentThemeId,
    update,
  };
}

function entry(key: string, value: any) {
  return value !== undefined ? { [key]: value } : {};
}

export const playingInfoWidth = 400;
