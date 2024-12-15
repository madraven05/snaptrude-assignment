import { forwardRef, useMemo } from "react";
import { Effect } from "postprocessing";
import { Color, Uniform, Vector2 } from "three";
import { outlineFragmentShader } from "../../shaders/OutlineFragmentShader";

/**
 * Outline effect that takes in, 
 * maskTexture - Silhouette FB texture
 * 
 * resolution - resolution of the canvas
 * 
 * outlineThickness - Thickness of the outline
 * 
 * outlineColor - Color of the outline
 */
class OutlineEffectImpl extends Effect {
  constructor({
    maskTexture,
    resolution = new Vector2(1024, 768),
    outlineThickness = 1.0,
    outlineColor = new Color("red"),
  }) {
    super("OutlineEffect", outlineFragmentShader, {
      uniforms: new Map([
        ["tSilhouette", new Uniform(maskTexture)],
        ["uResolution", new Uniform(resolution)],
        ["uOutlineThickness", new Uniform(outlineThickness)],
        ["uOutlineColor", new Uniform(outlineColor)],
      ]),
    });
  }
}

const OutlineEffect = forwardRef(
  (
    {
      maskTexture,
      resolution = new Vector2(1024, 768),
      outlineThickness = 1.0,
      outlineColor = new Color("red"),
    },
    ref
  ) => {
    const effect = useMemo(
      () =>
        new OutlineEffectImpl({
          maskTexture,
          resolution,
          outlineThickness,
          outlineColor,
        }),
      [maskTexture, resolution, outlineThickness, outlineColor]
    );
    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);

export default OutlineEffect;
