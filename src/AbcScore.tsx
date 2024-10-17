import abcjs from "abcjs";
import { useEffect, useRef } from "react";

const AbcScore = ({ abc, width, height }: { abc: string; width?: number; height?: number }) => {
  const abcContainerRef = useRef(null);

  useEffect(() => {
    if (abcContainerRef.current) {
      abcjs.renderAbc(abcContainerRef.current, abc, { responsive: "resize" });
    }
  }, [abc]);

  return <div style={{ width: width, height: height }} ref={abcContainerRef}></div>;
};

export default AbcScore;
