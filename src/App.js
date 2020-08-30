import React from "react";

import { PosenetHello } from "./posenet/posenet-hello";
import { Sketch } from "./paperjs/sketch";

import "./App.css";

function App() {
  return (
    <div className="App">
      <PosenetHello />
      <Sketch />
    </div>
  );
}

export default App;
