import * as BABYLON from "@babylonjs/core";
import { loadKit } from "./KitLoader";
import { MeshId, type MeshKey } from "./catalog";

type Piece = {
  id: string;                  // MeshKey ou id logique comme "Chequered8"
  g: [number, number, number]; // grid coords (peut être décimal)
  rotY?: number;
  scale?: number;
};

type LevelJson = {
  id: string;
  unit: number; // ex: 0.02
  pieces: Piece[];
};

function resolveMeshNames(id: string): string[] {
  if (id === "Chequered8") return [MeshId.Chequered8_p0, MeshId.Chequered8_p1];
  if ((id as MeshKey) in MeshId) return [MeshId[id as MeshKey]];
  return [id]; // fallback: nom GLB direct
}

// Fetch JSON robuste sans Vite
async function fetchJson<T>(pathFromPublic: string): Promise<T> {
  // pathFromPublic: "assets/levels/level1.json"
  const url = new URL(pathFromPublic.replace(/^\//, ""), document.baseURI).toString();

  const res = await fetch(url, { cache: "no-store" });
  const text = await res.text();

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} @ ${url}\n${text.slice(0, 200)}`);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(`NOT JSON @ ${url}\nFirst chars:\n${text.slice(0, 200)}`);
  }
}

export async function buildLevelFromJson(
  scene: BABYLON.Scene,
  levelPath = "src/levels/level1.json" // mets ton json dans public/assets/levels/
) {
  const kit = await loadKit(scene);
  const data = await fetchJson<LevelJson>(levelPath);

  // Root du niveau: scale global ici
  const levelRoot = new BABYLON.TransformNode("LEVEL_ROOT", scene);

  const WORLD_SCALE = 100; // augmente/diminue pour agrandir/réduire tout le niveau
  levelRoot.scaling.setAll(WORLD_SCALE);

  const unit = data.unit ?? 0.02;
  const yStep = unit; // cohérent avec tes mesures

  for (const p of data.pieces) {
    const names = resolveMeshNames(p.id);

    for (const name of names) {
      const src = kit[name];
      if (!src) {
        console.warn("Mesh not found:", name, "for piece:", p.id);
        continue;
      }

      const inst = src.createInstance(`${p.id}_inst`);
      inst.setEnabled(true);
      inst.isVisible = true;

      // IMPORTANT: parent au root => le WORLD_SCALE s'applique
      inst.parent = levelRoot;

      const [gx, gy, gz] = p.g;
      inst.position.set(gx * unit, gy * yStep, gz * unit);

      inst.rotationQuaternion = null;
      inst.rotation.y = p.rotY ?? 0;

      inst.scaling.setAll(p.scale ?? 1);
    }
  }

  return { levelRoot };
}
