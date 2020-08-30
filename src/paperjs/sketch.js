import React from "react";

import { usePaperScope } from "./utils";

export function Sketch({ width, height }) {
  const canvasRef = React.useRef(null);
  const settings = {
    insertItems: true,
  };
  const { scope } = usePaperScope({
    canvasRef,
    width,
    height,
    settings,
  });

  React.useEffect(() => {
    if (!scope) {
      return;
    }
    new scope.Path.Circle({
      center: [35, 35],
      radius: 35,
      fillColor: "red",
    });
  }, [scope]);

  return <canvas ref={canvasRef} />;
}
