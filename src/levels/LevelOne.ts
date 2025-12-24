import { PieceConfig } from "./LevelBuilderOld";

export const LevelOneLayout: PieceConfig[] = [
  // Start platform
  { file: "level1Top6x6.glb", pos: [0, 0, 0] },

  // Wide bridge forward
  { file: "Bridge1.glb", pos: [6, 0, 0] },

  // Gentle slope downward
  { file: "chute.glb", pos: [12, -2, 0], rot: [0, 0, 0] },

  // Curve to the right (rotate 90°)
  { file: "Tile3x3pyrMM.glb", pos: [12, -4, -6], rot: [0, Math.PI / 2, 0] },

  // Tube section
  { file: "TUBE.glb", pos: [12, -4, -12], rot: [0, Math.PI / 2, 0] },

  // Final ramp downward
  { file: "chute.glb", pos: [12, -6, -18], rot: [0, Math.PI / 2, 0] },

  // Goal
  { file: "goal.glb", pos: [12, -8, -24] },


];