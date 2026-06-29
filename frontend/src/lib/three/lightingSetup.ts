import * as THREE from "three";

export function setupLighting(scene: THREE.Scene) {
  // Ambient — very dark to keep it cinematic
  const ambient = new THREE.AmbientLight(0x0a0005, 0.5);
  scene.add(ambient);

  // Key light — harsh red from driver's left
  const keyLight = new THREE.DirectionalLight(0xff1a1a, 1.6);
  keyLight.position.set(-5, 8, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(2048, 2048);
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far  = 50;
  scene.add(keyLight);

  // Fill — cool blue from right to separate car from background
  const fillLight = new THREE.DirectionalLight(0x2244aa, 0.35);
  fillLight.position.set(6, 3, -3);
  scene.add(fillLight);

  // Rim — red backlight for silhouette glow
  const rimLight = new THREE.SpotLight(0xff0000, 4, 20, 0.5, 0.6);
  rimLight.position.set(0, 5, -7);
  scene.add(rimLight);

  // Under-car glow (dynamic — updated every frame based on car position)
  const underGlow = new THREE.PointLight(0xff0000, 2, 6);
  underGlow.position.set(0, 0.15, 0);
  scene.add(underGlow);

  return { ambient, keyLight, fillLight, rimLight, underGlow };
}
