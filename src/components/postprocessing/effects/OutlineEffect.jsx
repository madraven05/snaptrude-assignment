import { forwardRef, useMemo } from "react";
import { Effect } from "postprocessing";
import { Uniform, Vector2 } from "three";

const fragmentShader = /* glsl */ `
uniform sampler2D tSilhouette;
uniform vec2 uResolution;
uniform float uEdgeStrength; 
uniform vec3 uOutlineColor;
uniform sampler2D tDiffuse;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float texelSizeX = 1.0 / uResolution.x;
    float texelSizeY = 1.0 / uResolution.y;
    
    float maskColor = texture2D(tSilhouette, uv).r;
    float left = texture2D(tSilhouette, uv + vec2(-texelSizeX, 0.0)).r;
    float right = texture2D(tSilhouette, uv + vec2(texelSizeX, 0.0)).r;
    float up = texture2D(tSilhouette, uv + vec2(0.0, texelSizeY)).r;
    float down = texture2D(tSilhouette, uv + vec2(0.0, -texelSizeY)).r;

    // calculate slope
    float dx = (left - right);
    float dy = (down - up);
    float edgeVal = sqrt(dx * dx + dy * dy) * uEdgeStrength;

    vec3 baseColor = inputColor.rgb;
    vec3 finalColor = mix(baseColor, uOutlineColor, clamp(edgeVal, 0.0, 1.0));

    outputColor = vec4(finalColor, 1.0);
}
`;

class OutlineEffectImpl extends Effect {
  constructor({
    maskTexture,
    resolution = new Vector2(1024, 768),
    edgeStrength = 1.0,
    outlineColor = [1, 1, 1],
  }) {
    super("OutlineEffect", fragmentShader, {
      uniforms: new Map([
        ["tSilhouette", new Uniform(maskTexture)],
        ["uResolution", new Uniform(resolution)],
        ["uEdgeStrength", new Uniform(edgeStrength)],
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
      edgeStrength = 1.0,
      outlineColor = [1, 1, 1],
    },
    ref
  ) => {
    const effect = useMemo(
      () =>
        new OutlineEffectImpl({
          maskTexture,
          resolution,
          edgeStrength,
          outlineColor,
        }),
      [maskTexture, resolution, edgeStrength, outlineColor]
    );
    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);

export default OutlineEffect;
