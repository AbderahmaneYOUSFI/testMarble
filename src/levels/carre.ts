import * as BABYLON from "@babylonjs/core";

export function applyTileGridMaterial(
  scene: BABYLON.Scene,
  meshes: BABYLON.AbstractMesh[],
  opts?: {
    tileSize?: number;   // smaller => more squares
    lineWidth?: number;  // thickness of grid lines
    baseColor?: BABYLON.Color3;
    lineColor?: BABYLON.Color3;
  }
) {
  const tileSize = opts?.tileSize ?? 0.25;
  const lineWidth = opts?.lineWidth ?? 0.08;
  const baseColor = opts?.baseColor ?? new BABYLON.Color3(0.62, 0.62, 0.68);
  const lineColor = opts?.lineColor ?? new BABYLON.Color3(0.12, 0.12, 0.14);

  BABYLON.Effect.ShadersStore["mmGridVertexShader"] = `
    precision highp float;
    attribute vec3 position;
    uniform mat4 worldViewProjection;
    uniform mat4 world;
    varying vec3 vWorldPos;
    void main() {
      vec4 wp = world * vec4(position, 1.0);
      vWorldPos = wp.xyz;
      gl_Position = worldViewProjection * vec4(position, 1.0);
    }
  `;

  BABYLON.Effect.ShadersStore["mmGridFragmentShader"] = `
    precision highp float;
    varying vec3 vWorldPos;

    uniform float tileSize;
    uniform float lineWidth;
    uniform vec3 baseColor;
    uniform vec3 lineColor;

    float gridLine(float coord) {
      // coord mapped into repeating tile units
      float t = fract(coord / tileSize);
      // distance to nearest edge (0 at edge, 0.5 at center)
      float d = min(t, 1.0 - t);
      // line is near the edge => d small
      float line = smoothstep(lineWidth, 0.0, d);
      return line;
    }

    void main() {
      // Marble Madness style: tiles on XZ plane
      float gx = gridLine(vWorldPos.x);
      float gz = gridLine(vWorldPos.z);
      float g = max(gx, gz);

      vec3 col = mix(baseColor, lineColor, g);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const mat = new BABYLON.ShaderMaterial(
    "MM_TileGrid",
    scene,
    { vertex: "mmGrid", fragment: "mmGrid" },
    {
      attributes: ["position"],
      uniforms: ["worldViewProjection", "world", "tileSize", "lineWidth", "baseColor", "lineColor"],
    }
  );

  mat.setFloat("tileSize", tileSize);
  mat.setFloat("lineWidth", lineWidth);
  mat.setColor3("baseColor", baseColor);
  mat.setColor3("lineColor", lineColor);

  for (const m of meshes) {
    m.material = mat;
  }

  return mat;
}
