import abcjs from "abcjs";
import { useEffect, useRef } from "react";

const AbcScore = ({ abc, width }: { abc: string; width?: number }) => {
  const abcContainerRef = useRef(null);

  useEffect(() => {
    if (abcContainerRef.current) {
      abcjs.renderAbc(abcContainerRef.current, abc, { responsive: "resize" });
    }
  }, [abc]);

  return <div style={{ width: width }} ref={abcContainerRef}></div>;
};

export default AbcScore;
