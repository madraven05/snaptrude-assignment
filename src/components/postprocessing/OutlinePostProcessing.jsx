import { Plane, useFBO } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useEffect, useMemo } from "react";
import SilhouetteMaskPass from "./passes/SilhouetteMaskPass";
import { EffectComposer } from "@react-three/postprocessing";
import OutlineEffect from "./effects/OutlineEffect";
import * as THREE from "three";

// Postprocessing object for the main scene
const OutlinePostProcessing = ({ selectedObject, showFBTexture = false, outlineColor, outlineThickness }) => {
  const fbo = useFBO({
    width: window.innerWidth,
    height: window.innerHeight,
    stencilBuffer: false,
    depthBuffer: true,
    format: THREE.RGBAFormat,
  });
  const { size } = useThree();
  useMemo(() => {
    fbo.setSize(size.width, size.height);
  }, [size, fbo]);

  return (
    <>
      <SilhouetteMaskPass selectedObject={selectedObject} fbo={fbo} />
      {showFBTexture ? (
        <Plane
          args={[20, 20]}
          rotation={[0, Math.PI / 2, 0]}
          position={[-15, 5, 0]}
        >
          <meshBasicMaterial map={fbo.texture} />
        </Plane>
      ) : null}
      <EffectComposer>
        <OutlineEffect
          maskTexture={fbo.texture}
          resolution={[fbo.width, fbo.width]}
          outlineThickness={outlineThickness}
          outlineColor={new THREE.Color(outlineColor)} // red outline
        />
      </EffectComposer>
    </>
  );
};

export default OutlinePostProcessing;
