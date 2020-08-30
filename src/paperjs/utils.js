import React from "react";
import { PaperScope } from "paper";

export function usePaperScope({ canvasRef }) {
  const [scope, setScope] = React.useState();

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const paperScope = new PaperScope();
    paperScope.setup(canvasRef.current);
    setScope(paperScope);
  }, [canvasRef]);

  return {
    scope,
  };
}
