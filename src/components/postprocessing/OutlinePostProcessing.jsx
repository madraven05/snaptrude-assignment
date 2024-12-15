import { Plane, useFBO } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { useMemo } from "react";
import MaskPass from "./passes/MaskPass";
import { EffectComposer } from "@react-three/postprocessing";
import OutlineEffect from "./effects/OutlineEffect";
import * as THREE from "three";

const OutlinePostProcessing = ({ selectedObject, showFBTexture = false }) => {
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
      <MaskPass selectedObject={selectedObject} fbo={fbo} />
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
          edgeStrength={2.0}
          outlineColor={[1, 0, 0]} // red outline
        />
      </EffectComposer>
    </>
  );
};

export default OutlinePostProcessing;
