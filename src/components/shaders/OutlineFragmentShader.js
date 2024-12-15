// Fragment shader
export const outlineFragmentShader = /* glsl */ `
uniform sampler2D tSilhouette;
uniform vec2 uResolution;
uniform float uOutlineThickness; 
uniform vec3 uOutlineColor;
uniform sampler2D tDiffuse;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    float texelSizeX = uOutlineThickness * (1.0 / uResolution.x);
    float texelSizeY = uOutlineThickness * (1.0 / uResolution.y);
    
    float maskColor = texture2D(tSilhouette, uv).r;
    float left = texture2D(tSilhouette, uv + vec2(-texelSizeX, 0.0)).r;
    float right = texture2D(tSilhouette, uv + vec2(texelSizeX, 0.0)).r;
    float up = texture2D(tSilhouette, uv + vec2(0.0, texelSizeY)).r;
    float down = texture2D(tSilhouette, uv + vec2(0.0, -texelSizeY)).r;

    // calculate slope
    float dx = (left - right);
    float dy = (down - up);
    float edgeVal = sqrt(dx * dx + dy * dy);

    vec3 baseColor = inputColor.rgb;
    vec3 finalColor = mix(baseColor, uOutlineColor, clamp(edgeVal, 0.0, 1.0));

    outputColor = vec4(finalColor, 1.0);
}
`;