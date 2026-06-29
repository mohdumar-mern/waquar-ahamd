import * as THREE from "three";

export interface ParticleSystem {
  points   : THREE.Points;
  velocities: { x: number; y: number; z: number; life: number }[];
  update   : (carZ: number, phase: number) => void;
}

export function createParticleSystem(count = 600): ParticleSystem {
  const positions  = new Float32Array(count * 3);
  const velocities = Array.from({ length: count }, () => ({
    x   : (Math.random() - 0.5) * 0.04,
    y   : Math.random() * 0.06 + 0.01,
    z   : Math.random() * 0.08 + 0.02,
    life: Math.random(),
  }));

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 2;
    positions[i * 3 + 1] = Math.random() * 0.5;
    positions[i * 3 + 2] = 2.5 + Math.random() * 1.5;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color      : 0xff2200,
    size       : 0.06,
    transparent: true,
    opacity    : 0.85,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  points.visible = false;

  const update = (carZ: number, phase: number) => {
    points.visible = phase >= 2;
    if (!points.visible) return;

    const pos = geo.attributes.position.array as Float32Array;
    velocities.forEach((v, i) => {
      v.life += 0.012;
      if (v.life > 1) {
        v.life       = 0;
        pos[i * 3]   = carZ + (Math.random() - 0.5) * 0.5;
        pos[i * 3 + 1] = 0.4;
        pos[i * 3 + 2] = carZ + 2.5;
      }
      pos[i * 3]     += v.x;
      pos[i * 3 + 1] += v.y;
      pos[i * 3 + 2] += v.z + (phase >= 3 ? 0.15 : 0);
    });

    geo.attributes.position.needsUpdate = true;
  };

  return { points, velocities, update };
}
