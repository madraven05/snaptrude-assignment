import { useLoader } from "@react-three/fiber";
import React from "react";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";

// Custom .obj loaded for the scene
const Bench = ({ onPointerOver, onPointerLeave }) => {
  const materials = useLoader(MTLLoader, "/Bench_HighRes.mtl");
  const object = useLoader(OBJLoader, "/Bench_HighRes.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return (
    <primitive
      position={[5, 0, 0]}
      scale={0.1}
      material={materials}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
      object={object}
    />
  );
};

export default Bench;
