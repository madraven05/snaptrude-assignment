import { useLoader } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";

const TableAndChairs = ({onPointerOver, onPointerLeave}) => {
  const materials = useLoader(MTLLoader, "/Table And Chairs.mtl");
  const object = useLoader(OBJLoader, "/Table And Chairs.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return (
    <group position={[3, -5, 10]}>
      <mesh onPointerOver={onPointerOver} onPointerLeave={onPointerLeave} scale={0.2} material={materials}>
        <primitive object={object} />
      </mesh>
    </group>
  );
};

export default TableAndChairs;
