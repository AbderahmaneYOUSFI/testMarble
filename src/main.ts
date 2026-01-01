import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import { buildLevelFromJson } from "./levels/Levelloader";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Caméra iso simple (prototype)
const cam = new BABYLON.ArcRotateCamera(
  "iso",
  Math.PI / 4,
  Math.PI / 3,
  1.2, // monde petit => radius petit
  BABYLON.Vector3.Zero(),
  scene
);
cam.attachControl(canvas, true);
cam.inputs.clear();
cam.lowerAlphaLimit = cam.upperAlphaLimit = cam.alpha;
cam.lowerBetaLimit = cam.upperBetaLimit = cam.beta;
cam.minZ = 0.001;

// frame sur le niveau
scene.onAfterRenderObservable.addOnce(() => {
  const ext = scene.getWorldExtends();
  const size = ext.max.subtract(ext.min);
  const center = ext.min.add(size.scale(0.5));
  cam.target.copyFrom(center);
  cam.radius = Math.max(size.length() * 0.6, 0.5);
});


<<<<<<< HEAD
 buildLevelOld(scene, LevelOneLayout); // Utilisation de LevelOneLayout avec buildLevelOld
// buildLevelOld(scene, LevelTwoLayout); // Utilisation de LevelTwoLayout avec buildLevelOld

//  buildLevelKit(scene, LevelThreeLayout); // Utilisation de LevelThreeLayout avec buildLevelKit
=======
(async () => {
  await buildLevelFromJson(scene);

  // Auto-frame
  scene.render();
  const ext = scene.getWorldExtends();
  const size = ext.max.subtract(ext.min);
  const center = ext.min.add(size.scale(0.5));
  cam.target.copyFrom(center);
  cam.radius = Math.max(size.length() * 0.35, 10);
})();
>>>>>>> 70834f5 (Add .gitignore and stop tracking node_modules)

engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());
