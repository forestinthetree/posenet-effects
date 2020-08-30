import React from "react";

import { Point, Path, Rectangle, Raster, PointText } from "paper";

import { Sketch } from "./sketch";
import { usePosenet } from "../posenet/use-posenet";

import image from "../images/sample-image.jpg";

export function SketchPose() {
  const imageId = "sample-image";
  const width = 500;
  const height = 750;
  const imageStyles = {
    marginTop: "20px",
    width: `${width}px`,
    height: `${height}px`,
  };

  const imageRef = React.useRef(null);
  const { pose } = usePosenet({ imageRef });

  React.useEffect(() => {
    if (!pose) {
      return;
    }

    // Draw pose keypoints on the canvas
    const { keypoints } = pose;
    keypoints.forEach((keypoint) => {
      const {
        position: { x, y },
        part,
        score,
      } = keypoint;

      const point = new Point(x, y);
      const pointColor = score > 0.1 ? "red" : "#aaaaaa";
      new Path.Circle({
        center: point,
        radius: 2,
        fillColor: pointColor,
      });

      const textColor = score > 0.1 ? "black" : "#aaaaaa";
      new PointText({
        point: new Point(x + 3, y - 3),
        content: part,
        fillColor: textColor,
        fontSize: 10,
      });
    });
  }, [pose]);

  const onInit = () => {
    // Draw image on the canvas
    const image = new Raster(imageId);

    const rectArgs = [0, 0, width, height];
    const rectangle = new Rectangle(...rectArgs);
    image.fitBounds(rectangle);
    image.opacity = 0.1;
  };

  return (
    <>
      <div style={{ display: "none" }}>
        <img
          id={imageId}
          ref={imageRef}
          style={imageStyles}
          alt="Person in a pose"
          src={image}
        />
      </div>
      <Sketch onInit={onInit} />
    </>
  );
}
