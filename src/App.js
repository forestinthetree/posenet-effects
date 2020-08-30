import React from "react";

import { PosenetHello } from "./posenet/posenet-hello";
import { Sketch } from "./paperjs/sketch";

import "./App.css";

function App() {
  const width = 500;
  const height = 750;

  const onDraw = ({ Path, view }) => {
    const circle = new Path.Circle({
      center: view.center,
      radius: 35,
      fillColor: "red",
    });

    view.onResize = function (event) {
      circle.position = view.center;
    };
  };

  return (
    <div className="App">
      <PosenetHello width={width} height={height} />
      <Sketch onDraw={onDraw} />
    </div>
  );
}

export default App;
