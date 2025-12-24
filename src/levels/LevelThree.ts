import { PieceConfig } from "./LevelBuilderKit";

export const LevelThreeLayout: PieceConfig[] = [
  // --- BASE PIECE (exemple) ---
  {
    file: "Track Open 16cm",
    pos: [0, 0, 0],
    rot: [0, 0, 0],
    scale: [10, 10, 10],
  },

  // --- NEW PIECE 1 : STEP 1 ---
  {
    file: "Step 1.001",
    pos: [0, -2, 20],      // un peu plus loin
    rot: [0, 0, 0],
    scale: [10, 10, 10],
  },

  // --- NEW PIECE 2 : STEP 2 ---
  {
    file: "Step 2.001",
    pos: [0, -4, 30],      // juste après Step 1
    rot: [0, 0, 0],
    scale: [10, 10, 10],
  },

  // --- NEW PIECE 3 : petite descente après les steps ---
  {
    file: "Track Slide Filled 8cm",
    pos: [0, -6, 40],
    rot: [0, 0, 0],
    scale: [10, 10, 10],
  },

  // --- EXEMPLE : une ligne droite pour continuer ---
  {
    file: "Track Open 12cm",
    pos: [0, -6, 50],
    rot: [0, 0, 0],
    scale: [30, 30, 30],
  },
  { file: "Track Open 8cm", 
    pos: [0, -6, 51], 
    rot: [0, 0, 0],
    scale: [30, 30, 30],
 },
{ file: "Custom Side Piece",
    pos: [5, -5, 60],
    rot: [0, Math.PI / 4, 0],
    scale: [10, 10, 10],
},

];