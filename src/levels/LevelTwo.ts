import { PieceConfig } from "./LevelBuilderOld";

export const LevelTwoLayout: PieceConfig[] = [
  { file: "level1Top6x6.glb", pos: [0, 0, 0] },                   // start
  { file: "Bridge2.glb",      pos: [6, 0, 0] },                   // narrower bridge
  { file: "hole.glb",         pos: [12, 0, 0] },                  // trap
  { file: "TUBE.glb",         pos: [18, 0, 0] },                  // tube section
  { file: "chute.glb",        pos: [24, 0, 0] },                  // steeper slope
  { file: "post.glb",         pos: [30, 0, 0] },                  // obstacle
  { file: "railing2.glb",     pos: [18, 0, -4] },                 // side rail
  { file: "goal.glb",         pos: [36, 0, 0] },                  // finish
];