import * as THREE from "three";

/** Builds a procedural F1 car group — no external assets needed */
export function buildF1Car(): { car: THREE.Group; wheels: THREE.Group[] } {
  const car = new THREE.Group();

  // ── Materials ──────────────────────────────────────────────────────────────
  const carbon = new THREE.MeshStandardMaterial({ color: 0x0d0d0d, metalness: 0.2,  roughness: 0.65 });
  const red    = new THREE.MeshStandardMaterial({ color: 0xcc0000, metalness: 0.45, roughness: 0.30 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xbbbbbb, metalness: 1.0,  roughness: 0.05 });
  const glass  = new THREE.MeshStandardMaterial({ color: 0x99ccff, metalness: 0.1,  roughness: 0.05, transparent: true, opacity: 0.45 });
  const tire   = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.0,  roughness: 0.95 });
  const rim    = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 1.0,  roughness: 0.10 });
  const glow   = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const add = (geo: THREE.BufferGeometry, mat: THREE.Material, px=0,py=0,pz=0, rx=0,ry=0,rz=0) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(px, py, pz);
    m.rotation.set(rx, ry, rz);
    m.castShadow = true;
    car.add(m);
    return m;
  };

  // Chassis
  add(new THREE.BoxGeometry(1.6, 0.3, 4.2),  carbon, 0, 0.45, 0);
  // Nose cone
  add(new THREE.CylinderGeometry(0.08, 0.5, 1.6, 6), carbon, 0, 0.45, -2.8);
  // Cockpit tub
  add(new THREE.BoxGeometry(0.7, 0.35, 1.4), carbon, 0, 0.75, 0.3);
  // Halo
  add(new THREE.TorusGeometry(0.38, 0.04, 8, 20, Math.PI), chrome, 0, 1.12, 0.2);
  // Visor
  add(new THREE.BoxGeometry(0.65, 0.18, 0.6), glass, 0, 0.98, 0.05);
  // Sidepods
  add(new THREE.BoxGeometry(0.42, 0.3, 2.0), red, -0.95, 0.42, 0.4);
  add(new THREE.BoxGeometry(0.42, 0.3, 2.0), red,  0.95, 0.42, 0.4);
  // Engine cover
  add(new THREE.BoxGeometry(1.5, 0.4, 1.2), red, 0, 0.5, 1.9);
  // Rear wing
  add(new THREE.BoxGeometry(1.8, 0.08, 0.55), carbon, 0, 1.5, 2.3);
  add(new THREE.BoxGeometry(1.8, 0.06, 0.40), red,    0, 1.2, 2.15);
  add(new THREE.BoxGeometry(0.06, 0.4, 0.55), carbon, -0.9, 1.35, 2.3);
  add(new THREE.BoxGeometry(0.06, 0.4, 0.55), carbon,  0.9, 1.35, 2.3);
  // Front wing
  add(new THREE.BoxGeometry(1.9, 0.06, 0.6), carbon, 0, 0.22, -2.5);
  add(new THREE.BoxGeometry(1.9, 0.06, 0.4), red,    0, 0.30, -2.35);
  add(new THREE.BoxGeometry(0.06, 0.2, 0.65), carbon, -0.95, 0.26, -2.5);
  add(new THREE.BoxGeometry(0.06, 0.2, 0.65), carbon,  0.95, 0.26, -2.5);
  // Exhaust glow dots
  for (let i = 0; i < 3; i++) {
    add(new THREE.CircleGeometry(0.04, 8), glow, -0.15 + i * 0.15, 0.6, 2.52);
  }

  // ── Wheels ─────────────────────────────────────────────────────────────────
  const wheelPositions: [number, number, number][] = [
    [-1.15, 0.32, -1.5],
    [ 1.15, 0.32, -1.5],
    [-1.15, 0.32,  1.6],
    [ 1.15, 0.32,  1.6],
  ];

  const wheels: THREE.Group[] = [];
  wheelPositions.forEach(([x, y, z]) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    car.add(g);

    const tireM = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.28, 24), tire);
    tireM.rotation.z = Math.PI / 2;
    g.add(tireM);

    const rimM = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.30, 8), rim);
    rimM.rotation.z = Math.PI / 2;
    g.add(rimM);

    const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 6), glow);
    nut.rotation.z = Math.PI / 2;
    g.add(nut);

    wheels.push(g);
  });

  return { car, wheels };
}
