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
  const sharp = "♯";
  const flat = "♭";
  const alterationText = `(${Math.abs(alt)}${alt > 0 ? sharp : flat})`;
  return (
    <span>
      {keySignature.tonic.replace("#", sharp).replace("b", flat).toUpperCase()}{" "}
      <span style={{ color: modeColors[keySignature.mode] }}>{keySignature.mode}</span>{" "}
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
  "#051ffb", // Darker Blue
  "#0922e0",
  "#0d25c0",
  "#1827a1",
  "#232982",
  "#2e2a63",
  "#3a2b44",
  "#4d3300", // Middle Brown
  "#664400",
  "#805500",
  "#996600",
  "#b37700",
  "#cc8800",
  "#e69900",
  "#ffaa00", // Brighter Orange
];
