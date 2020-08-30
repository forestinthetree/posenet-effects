import React from "react";

import { PosenetHello } from "./posenet/posenet-hello";
import { Sketch } from "./paperjs/sketch";

import "./App.css";

function App() {
  const width = 500;
  const height = 750;
  return (
    <div className="App">
      <PosenetHello width={width} height={height} />
      <Sketch width={width} height={height} />
    </div>
  );
}

export default App;
