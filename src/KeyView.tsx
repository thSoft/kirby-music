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
  return `${keySignature.tonic} ${keySignature.mode} ${alt != 0 ? alterationText : ""}`;
}
