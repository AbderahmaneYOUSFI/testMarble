import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

type MovableNode = BABYLON.TransformNode | BABYLON.AbstractMesh;

function isMovable(n: BABYLON.Node): n is MovableNode {
  return n instanceof BABYLON.TransformNode || n instanceof BABYLON.AbstractMesh;
}

export async function importLaunchGroup(scene: BABYLON.Scene) {
  const container = await BABYLON.SceneLoader.LoadAssetContainerAsync(
    "public/assets/levels/",
    "MarbleKit.glb",
    scene
  );

  container.addAllToScene();

  const group = new BABYLON.TransformNode("LAUNCH_GROUP", scene);

  // IMPORTANT: name must match what is exported from Blender
  const desiredName = "Launch (root)";

  const candidates: BABYLON.Node[] = [
    ...container.rootNodes,
    ...container.transformNodes,
    ...container.meshes,
  ];

  const found = candidates.find((n) => n.name === desiredName);

  if (found && isMovable(found)) {
    found.parent = group;
    console.log("Found and grouped:", found.name);
  } else {
    console.warn(`"${desiredName}" not found. Grouping rootNodes instead.`);
    for (const rn of container.rootNodes) rn.parent = group;

    console.log("Root nodes:", container.rootNodes.map((n) => n.name));
    console.log("Transform nodes:", container.transformNodes.map((n) => n.name));
  }

  // Set scale here OR in main (not both). We'll do it in main.
  return { group, container };
}
