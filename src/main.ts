import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

import { buildLevelOld } from "./levels/LevelBuilderOld";
import { buildLevelKit } from "./levels/LevelBuilderKit";

import { LevelOneLayout } from "./levels/LevelOne";
import { LevelTwoLayout } from "./levels/LevelTwo";
import { LevelThreeLayout } from "./levels/LevelThree";

const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
const scene = new BABYLON.Scene(engine);

// Camera
const camera = new BABYLON.ArcRotateCamera(
  "cam",
  Math.PI / 4,
  Math.PI / 3,
  40,
  BABYLON.Vector3.Zero(),
  scene
);
camera.attachControl(canvas, true);

// Light
new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// Choose which level to build

// buildLevelOld(scene, LevelOneLayout); // Utilisation de LevelOneLayout avec buildLevelOld
// buildLevelOld(scene, LevelTwoLayout); // Utilisation de LevelTwoLayout avec buildLevelOld

buildLevelKit(scene, LevelThreeLayout); // Utilisation de LevelThreeLayout avec buildLevelKit

engine.runRenderLoop(() => scene.render());