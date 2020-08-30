import React from "react";

import { usePaperScope } from "./utils";

export function Sketch({
  width,
  height,
  // By default, Paper.js renders into a hi-res Canvas on Hi-DPI (Retina) screens to match their native resolution, and handles all the additional transformations for you transparently
  hiDPI = "on",
  onInit = () => {},
}) {
  const resize = !width && !height;
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

    onInit(scope);
  }, [onInit, scope]);

  return (
    <canvas
      ref={canvasRef}
      data-paper-resize={resize}
      data-paper-hidpi={hiDPI}
    />
  );
}
