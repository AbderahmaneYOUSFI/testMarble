
# 📘 **README for amine**

## 🟦 Project Overview
This project is a BabylonJS marble game with **three levels**:

- **Level 1 & 2** use **individual GLB files** (old system)  
- **Level 3** uses **one modular kit**: `MarbleKit.glb` (new system)

Both systems coexist cleanly using two separate builders.

---

## 🟩 Folder Structure (Important Only)

```
src/
  levels/
    LevelBuilderOld.ts     → loads individual GLB files
    LevelBuilderKit.ts     → loads MarbleKit.glb
    LevelOne.ts
    LevelTwo.ts
    LevelThree.ts
main.ts
public/
  assets/
    levels/
      MarbleKit.glb
      (old level .glb files)
```

---

## 🟦 How Level Loading Works

### **Old Levels (1 & 2)**  
Use **LevelBuilderOld**:

```ts
{ file: "bridge.glb", pos: [x,y,z], rot: [...], scale: [...] }
```

Each piece = one GLB file.

---

### **Kit Level (Level 3)**  
Use **LevelBuilderKit**:

```ts
{ file: "Track Open 16cm", pos: [x,y,z], scale: [10,10,10] }
```

Each piece = one **mesh name inside MarbleKit.glb**.

⚠️ Blender collections (e.g., `Example: Steps`) do **not** appear in BabylonJS.  
Only **meshes** inside the collection are usable.

---

## 🟧 main.ts (Level Selector)

```ts
buildLevelOld(scene, LevelOneLayout);
  buildLevelOld(scene, LevelTwoLayout);
 buildLevelKit(scene, LevelThreeLayout);
```

---

## 🟦 Adding a New Piece to Level 3

1. Open Blender  
2. Check the mesh name (not the collection name)  
3. Use that name in the layout:

```ts
{ file: "Step 1.001", pos: [0,0,0], scale: [10,10,10] }
```

---

## 🟩 Rules for Contributors

### ✔ DO
- Use **LevelBuilderOld** for old levels  
- Use **LevelBuilderKit** for modular levels  
- Use **mesh names** exactly as they appear in the GLB  
- Apply **scale** (×10 or ×30) because Blender units are small  
- Keep layouts clean and readable

### ❌ DO NOT
- Try to instantiate Blender collections  
- Rename meshes in Blender without updating layouts  
- Mix old GLB files inside Level 3  
- Put assets outside `public/assets/levels/`

npm run build
npm run dev 
