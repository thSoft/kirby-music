import { Stack } from "react-bootstrap";
import { Key, Mode } from "tonal";
import { KeySignature } from "./data";

export function KeyView({ keySignature: keySignature }: { keySignature: KeySignature | undefined }) {
  return (
    <Stack direction="horizontal" gap={1}>
      Key:
      <span>{keySignature ? <KeyText keySignature={keySignature} /> : `-`}</span>
    </Stack>
  );
}

function KeyText({ keySignature }: { keySignature: KeySignature }) {
  const alt = Key.majorKey(Mode.relativeTonic("major", keySignature.mode, keySignature.tonic)).alteration;
  const alterationText = `(${Math.abs(alt)}${alt > 0 ? "♯" : "♭"})`;
  return (
    <span>
      {keySignature.tonic} <span style={{ color: modeColors[keySignature.mode] }}>{keySignature.mode}</span>{" "}
      <span style={{ color: alterationColors[alt + 7] }}>{alt != 0 ? alterationText : ""}</span>
    </span>
  );
}

const modeColors: { [mode: string]: string } = {
  lydian: "#85d47c",
  major: "#5db264",
  mixolydian: "#3e8f82",
  dorian: "#2170a2",
  minor: "#514a9f",
  phrygian: "#3b2d7b",
  locrian: "#2a1658",
};

const alterationColors = [
  "#ffaa00", // Brighter Orange
  "#e69900",
  "#cc8800",
  "#b37700",
  "#996600",
  "#805500",
  "#664400",
  "#4d3300", // Middle Brown
  "#3a2b44",
  "#2e2a63",
  "#232982",
  "#1827a1",
  "#0d25c0",
  "#0922e0",
  "#051ffb", // Darker Blue
];
