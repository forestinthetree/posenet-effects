import React from "react";
import "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

import image from "./sample-image.jpg";

const imageStyles = {
  marginTop: "20px",
  width: "500px",
};

export function PosenetHello() {
  async function estimatePoseOnImage(imageElement) {
    const net = await posenet.load();

    const pose = await net.estimateSinglePose(imageElement, {
      flipHorizontal: false,
    });
    return pose;
  }

  React.useEffect(() => {
    const imageElement = document.getElementById("sample-image");

    estimatePoseOnImage(imageElement).then((pose) => {
      console.log(pose);
    });
  }, []);

  return <img id="sample-image" style={imageStyles} alt="Sample" src={image} />;
}
