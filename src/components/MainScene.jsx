import { OrbitControls, OrthographicCamera, useFBO } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import OutlinePostProcessing from "./postprocessing/OutlinePostProcessing";

const MainScene = () => {
  const [selectedObject, setSelectedObject] = useState(null);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setSelectedObject(e.object);
  };

  const handlePointerLeave = (e) => {
    e.stopPropagation();
    setSelectedObject(null);
  };

  return (
    <div className="bg-black/40 h-[60vh] w-full mt-10 shadow-md">
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

        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[70, 70]} />
          <meshStandardMaterial />
        </mesh>

        <group position={[0, 0, -5]}>
          <mesh
            onPointerOver={handlePointerOver}
            onPointerLeave={handlePointerLeave}
            position={[0, 0, 0]}
          >
            <sphereGeometry args={[5]} />
            <meshStandardMaterial color={"purple"} />
          </mesh>
          <mesh
            onPointerOver={handlePointerOver}
            onPointerLeave={handlePointerLeave}
            position={[4, 0, 0]}
          >
            <sphereGeometry args={[5]} />
            <meshStandardMaterial color={"lightgreen"} />
          </mesh>
          <mesh onPointerOver={handlePointerOver}
            onPointerLeave={handlePointerLeave} position={[2, 0, 4]}>
            <sphereGeometry args={[3]} />
            <meshStandardMaterial color={"coral"} />
          </mesh>
          <mesh onPointerOver={handlePointerOver}
            onPointerLeave={handlePointerLeave} position={[-6, 0, 4]}>
            <sphereGeometry args={[6]} />
            <meshStandardMaterial color={"lightblue"} />
          </mesh>
          <mesh onPointerOver={handlePointerOver}
            onPointerLeave={handlePointerLeave} position={[-1, 5, -3]}>
            <sphereGeometry args={[4]} />
            <meshStandardMaterial color={"teal"} />
          </mesh>
          {/* <TableAndChairs/> */}
        </group>
        <OrbitControls />
        <OutlinePostProcessing selectedObject={selectedObject} />
      </Canvas>
    </div>
  );
};

export default MainScene;
