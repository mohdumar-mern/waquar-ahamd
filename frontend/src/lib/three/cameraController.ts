import * as THREE from "three";

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const lerp  = (a: number, b: number, t: number)   => a + (b - a) * t;

export function updateCamera(
  camera  : THREE.PerspectiveCamera,
  phase   : number,
  scroll  : number,
  time    : number,
  carZ    : number,
) {
  const target = new THREE.Vector3(0, 0.5, carZ);

  switch (phase) {
    case 0: {
      // Slow orbit
      const a = time * 0.25;
      camera.position.set(Math.sin(a) * 9, 2.5, Math.cos(a) * 9);
      break;
    }
    case 1: {
      const t = clamp((scroll - 0.12) / 0.13, 0, 1);
      const a = time * 0.25;
      const r = lerp(9, 5, t);
      camera.position.set(Math.sin(a) * r, lerp(2.5, 2.0, t), Math.cos(a) * r);
      break;
    }
    case 2: {
      const t = clamp((scroll - 0.25) / 0.15, 0, 1);
      camera.position.set(lerp(4, 3, t), lerp(2.0, 1.6, t), lerp(6, 5, t));
      break;
    }
    case 3: {
      // Chase
      camera.position.set(0, 2.5, carZ + 8);
      break;
    }
    case 4: {
      // Dramatic multi-angle rotation
      const t = clamp((scroll - 0.65) / 0.20, 0, 1);
      const a = t * Math.PI * 2;
      camera.position.set(Math.sin(a) * 5, 1.5 + Math.sin(a * 0.5) * 1.5, carZ + Math.cos(a) * 5);
      break;
    }
    default: {
      // Max speed — low dramatic angle with camera shake
      const shake = Math.sin(time * 30) * 0.04;
      camera.position.set(shake, 0.9, carZ + 5);
      target.y = carZ + 0.3;
    }
  }

  camera.lookAt(target);
}
