import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import MainScene from "./components/MainScene";

function App() {
  return (
    <>
      <div className="flex flex-col gap-5 items-center py-10 px-20">
        <div className="text-center">
          <h1>Snaptrude Assignment</h1>
          <h2 className="text-gray-500">Outline Shading</h2>
        </div>

        {/* Scene */}
        <MainScene/>
      </div>
    </>
  );
}

export default App;
