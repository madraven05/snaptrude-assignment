import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import TableAndChairs from "./TableAndChairs";

const MainScene:React.FC = () => {
  return (
    <div className="w-full h-[60vh] bg-black/50">
      <Canvas>
        <OrthographicCamera
          makeDefault
          position={[15, 15, 15]}
          far={2000}
          near={0.1}
          zoom={10}
        />
        <ambientLight />
        <directionalLight position={[15, 12, 15]} />
        {/* Base plane */}
        <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[40, 50]} />
          <meshBasicMaterial />
        </mesh>

        {/* Overlapping meshes */}
        <group position={[0,0,-5]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[5]} />
            <meshStandardMaterial color={"purple"} />
          </mesh>
          <mesh position={[4, 0, 0]}>
            <sphereGeometry args={[5]} />
            <meshStandardMaterial color={"lightgreen"} />
          </mesh>
          <mesh position={[2, 0, 4]}>
            <sphereGeometry args={[3]} />
            <meshStandardMaterial color={"coral"} />
          </mesh>
          <mesh position={[-6, 0, 4]}>
            <sphereGeometry args={[6]} />
            <meshStandardMaterial color={"lightblue"} />
          </mesh>
          <mesh position={[-1, 5, -3]}>
            <sphereGeometry args={[4]} />
            <meshStandardMaterial color={"teal"} />
          </mesh>
          <TableAndChairs/>
        </group>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default MainScene;
