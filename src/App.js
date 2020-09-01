import React from "react";

import { useWebsocketPose } from "./paperjs/use-websocket-pose";

function App() {
  useWebsocketPose();

  return <div className="App"></div>;
}

export default App;
