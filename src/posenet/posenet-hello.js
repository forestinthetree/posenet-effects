import React from "react";
import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

import image from "./sample-image.jpg";

async function estimatePoseOnImage(imageElement) {
  const net = await posenet.load();

  const pose = await net.estimateSinglePose(imageElement, {
    flipHorizontal: false,
  });
  return pose;
}

export function PosenetHello({ width, height }) {
  const imageEl = React.useRef(null);
  const imageStyles = {
    marginTop: "20px",
    width: `${width}px`,
    height: `${height}px`,
  };

  React.useEffect(() => {
    estimatePoseOnImage(imageEl.current).then((pose) => {
      console.log(pose);
    });
  }, []);

  return <img ref={imageEl} style={imageStyles} alt="Sample" src={image} />;
}
