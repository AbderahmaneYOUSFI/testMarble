import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

export type PieceConfig = {
  file: string; // filename like "bridge.glb"
  pos: [number, number, number];
  rot?: [number, number, number];
  scale?: [number, number, number];
};

const ROOT = "/assets/levels/";
const sourceCache: Record<string, BABYLON.Mesh> = {};

async function getSourceMesh(file: string, scene: BABYLON.Scene) {
  if (sourceCache[file]) return sourceCache[file];

  const res = await BABYLON.SceneLoader.ImportMeshAsync("", ROOT, file, scene);

  const mesh = res.meshes.find(
    m => m instanceof BABYLON.Mesh && m.geometry
  ) as BABYLON.Mesh;

  if (!mesh) {
    console.error("No geometry found in", file);
    return null;
  }

  mesh.setEnabled(false);
  sourceCache[file] = mesh;
  return mesh;
}

export async function buildLevelOld(scene: BABYLON.Scene, layout: PieceConfig[]) {
  for (const piece of layout) {
    const source = await getSourceMesh(piece.file, scene);
    if (!source) continue;

    const inst = source.createInstance(piece.file + "_inst");

    inst.position = new BABYLON.Vector3(...piece.pos);
    if (piece.rot) inst.rotation = new BABYLON.Vector3(...piece.rot);
    if (piece.scale) inst.scaling = new BABYLON.Vector3(...piece.scale);
  }
}