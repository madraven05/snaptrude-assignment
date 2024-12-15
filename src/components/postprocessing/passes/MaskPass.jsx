import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

const MaskPass = ({ selectedObject, fbo }) => {
  const { scene, camera, gl } = useThree();

  const whiteMaterial = new THREE.MeshBasicMaterial({color: "white"});
  const originalMeshes = useRef(new Map());

  useFrame(() => {
    // set selected mesh to white color
    // and rest all as invisible
    scene.traverse((obj) => {
      if (obj.isMesh) {
        originalMeshes.current.set(obj, {
          visible: obj.visible,
          material: obj.material,
        });
        if (selectedObject == obj) {
          obj.visible = true;
          obj.material = whiteMaterial;
        } else {
          obj.visible = false;
        }
      }
    });

    // render into frame buffer
    gl.setRenderTarget(fbo);
    gl.clear(1, 1, 1);
    gl.render(scene, camera);

    // reset render target
    gl.setRenderTarget(null);

    // set original material and visibility to meshes in the scene
    scene.traverse((obj) => {
      if(obj.isMesh && originalMeshes.current.has(obj)) {
        const {visible, material} = originalMeshes.current.get(obj);
        obj.visible = visible;
        obj.material = material;
      }
    })
  });

  return null;
};

export default MaskPass;
