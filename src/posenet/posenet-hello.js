import React from "react";
import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

import image from "./sample-image.jpg";

const imageStyles = {
  marginTop: "20px",
  width: "500px",
};

export function PosenetHello() {
  const imageEl = React.useRef(null);
  async function estimatePoseOnImage(imageElement) {
    const net = await posenet.load();

    const pose = await net.estimateSinglePose(imageElement, {
      flipHorizontal: false,
    });
    return pose;
  }

  React.useEffect(() => {
    estimatePoseOnImage(imageEl.current).then((pose) => {
      console.log(pose);
    });
  }, []);

  return <img ref={imageEl} style={imageStyles} alt="Sample" src={image} />;
}
