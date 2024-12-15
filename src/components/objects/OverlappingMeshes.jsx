import React, { Suspense } from "react";
import Bench from "./Bench";

const OverlappingMeshes = ({ setSelectedObject }) => {
  const handlePointerOver = (e) => {
    e.stopPropagation();
    setSelectedObject(e.object);
  };

  const handlePointerLeave = (e) => {
    e.stopPropagation();
    setSelectedObject(null);
  };

  return (
    <>
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
        <mesh
          onPointerOver={handlePointerOver}
          onPointerLeave={handlePointerLeave}
          position={[4, 0, 0]}
        >
          <boxGeometry args={[15, 5, 5]} />
          <meshStandardMaterial color={"pink"} />
        </mesh>
        <mesh
          onPointerOver={handlePointerOver}
          onPointerLeave={handlePointerLeave}
          position={[2, 0, 4]}
        >
          <sphereGeometry args={[3]} />
          <meshStandardMaterial color={"coral"} />
        </mesh>
        <mesh
          onPointerOver={handlePointerOver}
          onPointerLeave={handlePointerLeave}
          position={[-6, 0, 4]}
        >
          <sphereGeometry args={[6]} />
          <meshStandardMaterial color={"lightblue"} />
        </mesh>

        <mesh
          onPointerOver={handlePointerOver}
          onPointerLeave={handlePointerLeave}
          position={[-1, 5, -3]}
        >
          <sphereGeometry args={[4]} />
          <meshStandardMaterial color={"teal"} />
        </mesh>
      </group>
      <Suspense fallback={null}>
        <Bench
          onPointerOver={handlePointerOver}
          onPointerLeave={handlePointerLeave}
        />
      </Suspense>
    </>
  );
};

export default OverlappingMeshes;
