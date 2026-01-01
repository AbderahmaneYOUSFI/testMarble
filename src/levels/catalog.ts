export const MeshId = {
  LaunchBase: "Launch base",
  LaunchGate: "Launch gate",
  LaunchPiston: "Launch piston",

  WideFilled16: "Track Wide Open Filled 16cm",
  WideSlope16: "Track Wide Open Filled Sloped 16cm",
  Turn90Filled10: "Track 90º Open Filled 10cm",
  WideSpiral8_90_24: "Track Wide Spiral 8cm in 90º 24cm",

  // Chequered est split en 2 primitives dans ton GLB
  Chequered8_p0: "Track Open Filled SquareCap Chequered 8cm_primitive0",
  Chequered8_p1: "Track Open Filled SquareCap Chequered 8cm_primitive1",
} as const;

export type MeshKey = keyof typeof MeshId;
