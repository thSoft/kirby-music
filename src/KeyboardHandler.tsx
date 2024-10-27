import { useKey } from "react-use";
import { Track } from "./data";
import { usePlayingInfo } from "./utils";

export function KeyboardHandler({ currentTrack }: { currentTrack: Track }) {
  const { currentTrackId, currentSectionIndex, currentThemeId, start, update } = usePlayingInfo();
  const currentSection = currentTrack.sections[currentSectionIndex];
  const currentThemeOccurrenceIndex = currentThemeId ? currentSection.themeIds.indexOf(currentThemeId) : undefined;

  function moveSectionBy(delta: number, event: KeyboardEvent) {
    if (hasModifier(event)) {
      return;
    }
    const newSectionIndex = currentSectionIndex + delta;
    if (newSectionIndex >= 0 && newSectionIndex < currentTrack.sections.length) {
      const newSection = currentTrack.sections[newSectionIndex];
      update(currentTrackId, newSectionIndex, newSection.start, newSection.themeIds[0]);
    }
  }

  function moveThemeOccurrenceBy(delta: number, event: KeyboardEvent) {
    if (hasModifier(event)) {
      return;
    }
    if (currentThemeOccurrenceIndex === undefined) return;
    const newThemeOccurrenceIndex = currentThemeOccurrenceIndex + delta;
    if (newThemeOccurrenceIndex >= 0 && newThemeOccurrenceIndex < currentSection.themeIds.length) {
      const newThemeId = currentSection.themeIds[newThemeOccurrenceIndex];
      update(currentTrackId, currentSectionIndex, start, newThemeId);
    }
  }

  const sectionDeps = [currentTrack, currentSectionIndex];
  useKey("ArrowLeft", (event) => moveSectionBy(-1, event), undefined, sectionDeps);
  useKey("ArrowRight", (event) => moveSectionBy(+1, event), undefined, sectionDeps);

  const themeDeps = [currentSection, currentThemeOccurrenceIndex];
  useKey("ArrowUp", (event) => moveThemeOccurrenceBy(-1, event), undefined, themeDeps);
  useKey("ArrowDown", (event) => moveThemeOccurrenceBy(+1, event), undefined, themeDeps);

  return null;
}

function hasModifier(event: KeyboardEvent) {
  return event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
}
