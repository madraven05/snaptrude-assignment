import { OrbitControls, OrthographicCamera, Stats, useFBO } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import OutlinePostProcessing from "./postprocessing/OutlinePostProcessing";
import OverlappingMeshes from "./objects/OverlappingMeshes";

const MainScene = ({showFBTexture = false}) => {
  const [selectedObject, setSelectedObject] = useState(null);

  return (
    <div className="bg-black/40 h-[60vh] w-full shadow-md">
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
        <OverlappingMeshes setSelectedObject={setSelectedObject}/>
        <OutlinePostProcessing
          selectedObject={selectedObject}
          showFBTexture={showFBTexture}
        />
        <Stats/>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default MainScene;
