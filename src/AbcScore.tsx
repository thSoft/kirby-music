import abcjs from "abcjs";
import { useEffect, useRef } from "react";

const AbcScore = ({ abc }: { abc: string }) => {
  const abcContainerRef = useRef(null);

  useEffect(() => {
    if (abcContainerRef.current) {
      abcjs.renderAbc(abcContainerRef.current, abc);
    }
  }, [abc]);

  return <div ref={abcContainerRef}></div>;
};

export default AbcScore;
