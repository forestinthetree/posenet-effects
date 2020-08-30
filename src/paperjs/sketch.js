import React from "react";

import { usePaperScope } from "./utils";

export function Sketch() {
  const canvasRef = React.useRef(null);
  const { scope } = usePaperScope({
    canvasRef,
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
