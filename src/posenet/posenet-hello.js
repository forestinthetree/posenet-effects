import React from "react";

import image from "./sample-image.jpg";

import { usePosenet } from "./use-posenet";

export function PosenetHello({ width, height }) {
  const imageRef = React.useRef(null);
  const imageStyles = {
    marginTop: "20px",
    width: `${width}px`,
    height: `${height}px`,
  };

  const { pose } = usePosenet({ imageRef });

  console.log({ pose });

  return (
    <div style={{ display: "none" }}>
      <img ref={imageRef} style={imageStyles} alt="Sample" src={image} />
    </div>
  );
}
