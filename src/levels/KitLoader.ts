import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

const kitCache: Record<string, BABYLON.Mesh> = {};

export async function loadKit(scene: BABYLON.Scene) {
  if (Object.keys(kitCache).length) return kitCache;

  const res = await BABYLON.SceneLoader.ImportMeshAsync(
    "",
    "/assets/levels/",
    "MarbleKit.glb",
    scene
  );

  for (const m of res.meshes) {
    if (m instanceof BABYLON.Mesh && m.geometry) {
      
      m.setEnabled(true);
      m.isVisible = false;
      kitCache[m.name] = m;
    }
  }

  console.log("KIT NAMES:", Object.keys(kitCache));
  return kitCache;
}
