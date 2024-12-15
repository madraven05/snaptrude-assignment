import {
  OrbitControls,
  OrthographicCamera,
  Stats,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import OutlinePostProcessing from "./postprocessing/OutlinePostProcessing";
import OverlappingMeshes from "./objects/OverlappingMeshes";
import OutlineEditPanel from "./OutlineEditPanel";

const MainScene = () => {
  const [selectedObject, setSelectedObject] = useState(null);

  // editing options
  const [outlineColor, setOutlineColor] = useState("#4799ea");
  const [outlineThickness, setOutlineThickness] = useState(1.0);
  const [showFBTexture, setShowFBTexture] = useState(false);

  return (
    <div className="relative bg-black/40 h-[60vh] w-full shadow-md">
      <Canvas>
        <OrthographicCamera
          makeDefault
          position={[15, 15, 15]}
          far={2000}
          near={0.1}
          zoom={10}
        />
        <ambientLight />
        <directionalLight />
        <OverlappingMeshes setSelectedObject={setSelectedObject} />
        <OutlinePostProcessing
          outlineColor={outlineColor}
          outlineThickness={outlineThickness}
          selectedObject={selectedObject}
          showFBTexture={showFBTexture}
        />
        <Stats />
        <OrbitControls />
      </Canvas>

      <OutlineEditPanel
        outlineColor={outlineColor}
        outlineThickness={outlineThickness}
        setOutlineColor={setOutlineColor}
        setOutlineThickness={setOutlineThickness}
        setShowFBTexture={setShowFBTexture}
      />
    </div>
  );
};

export default MainScene;
