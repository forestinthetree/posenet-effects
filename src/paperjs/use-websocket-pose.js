/*global paper:true */
import { useWebsocket } from "../utils/use-websocket";

const { Point, Path, PointText } = paper;

const posesPoints = [];

const POSE_SCORE_FILTER = 0.1;
const PART_SCORE_FILTER = 0.1;

const COLORS = [
  "#f6511d", // red orange
  "#ffb400", // honey yellow
  "#00a6ed", // carolina blue
  "#7fb800", // apple green
  "#0d2c54", // prussian blue
];

function renderPose({
  currentPosePoints,
  index,
  pose,
  color,
  scoreFilter = 0,
}) {
  let posePoints;
  if (currentPosePoints[index]) {
    posePoints = currentPosePoints[index];
  } else {
    posePoints = currentPosePoints[index] = {};
  }

  pose.keypoints
    .filter(({ score }) => score > scoreFilter)
    .forEach((keypoint) => {
      const {
        position: { x, y },
        part,
        score,
      } = keypoint;

      if (score < scoreFilter) {
        return;
      }

      if (posePoints[part]) {
        const { circle, text } = posePoints[part];
        circle.position = new Point(x, y);

        text.set({
          point: new Point(x + 3, y - 3),
        });
      } else {
        const center = new Point(x, y);
        const circle = new Path.Circle({
          center,
          radius: 2,
          fillColor: color,
        });
        const text = new PointText({
          point: new Point(x + 3, y - 3),
          content: part,
          fillColor: color,
          fontSize: 10,
        });

        posePoints[part] = {
          circle,
          text,
        };
      }
    });
}

export function useWebsocketPose() {
  useWebsocket({
    url: "ws://localhost:8080",
    onOpen: () => {
      console.log("Websocket open");
    },
    onMessage: (event) => {
      const data = JSON.parse(event.data);

      const { poses } = data;
      poses
        .filter(({ score }) => score > POSE_SCORE_FILTER)
        .forEach((pose, index) => {
          const color = COLORS[index % COLORS.length];
          renderPose({
            currentPosePoints: posesPoints,
            index,
            pose,
            color,
            scoreFilter: PART_SCORE_FILTER,
          });
        });
    },
    onClose: () => {
      console.log("Websocket close");
    },
  });
}
