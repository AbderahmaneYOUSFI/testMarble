import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

export type PieceConfig = {
  file: string; // mesh name inside MarbleKit.glb
  pos: [number, number, number];
  rot?: [number, number, number];
  scale?: [number, number, number];
};

const kitCache: Record<string, BABYLON.Mesh> = {};

async function loadKit(scene: BABYLON.Scene) {
  if (Object.keys(kitCache).length > 0) return kitCache;

  const res = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/assets/levels/",
    "MarbleKit.glb",
    scene
  );

  for (const m of res.meshes) {
    if (m instanceof BABYLON.Mesh && m.geometry) {
      m.setEnabled(false);
      kitCache[m.name] = m;
    }
  }

  console.log("Kit loaded:", Object.keys(kitCache));
  return kitCache;
}

export async function buildLevelKit(scene: BABYLON.Scene, layout: PieceConfig[]) {
  const kit = await loadKit(scene);

  for (const piece of layout) {
    const source = kit[piece.file];
    if (!source) {
      console.warn("Mesh not found in kit:", piece.file);
      continue;
    }

    const inst = source.createInstance(piece.file + "_inst");

    inst.position = new BABYLON.Vector3(...piece.pos);
    if (piece.rot) inst.rotation = new BABYLON.Vector3(...piece.rot);
    if (piece.scale) inst.scaling = new BABYLON.Vector3(...piece.scale);
  }
}