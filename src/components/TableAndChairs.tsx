import { useLoader } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { MTLLoader, OBJLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

const TableAndChairs: React.FC = () => {
  const materials = useLoader(MTLLoader, "/Table And Chairs.mtl");
  const object = useLoader(OBJLoader, "/Table And Chairs.obj", (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (groupRef.current && object) {
      groupRef.current.add(object);
    }
  }, [object]);

  return (
    <group position={[3,-5,10]}>
      <group scale={0.2} ref={groupRef} />
    </group>
  );
};

export default TableAndChairs;
