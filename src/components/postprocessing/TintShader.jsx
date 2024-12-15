import { forwardRef, useMemo } from 'react'
import { Effect } from 'postprocessing'
import { Uniform } from 'three'

// A small custom fragment shader that tints the final color:
const fragmentShader = /* glsl */`
uniform vec3 color;
uniform float intensity;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // Mix the original color with a tint
    vec3 tinted = mix(inputColor.rgb, color, intensity);
    outputColor = vec4(tinted, inputColor.a);
}
`;

class TintEffectImpl extends Effect {
  constructor({ color = [1, 0, 0], intensity = 0.5 }) {
    // "TintEffect" is just a label; it can be anything
    super('TintEffect', fragmentShader, {
      uniforms: new Map([
        ['color', new Uniform(color)],
        ['intensity', new Uniform(intensity)]
      ])
    })
  }
}

// This component will wrap our custom effect so we can easily place it in the EffectComposer
const TintEffect = forwardRef(({ color = [1, 0, 0], intensity = 0.5 }, ref) => {
  const effect = useMemo(() => new TintEffectImpl({ color, intensity }), [color, intensity])
  return <primitive ref={ref} object={effect} dispose={null} />
})

export default TintEffect
