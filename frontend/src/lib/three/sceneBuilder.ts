import * as THREE from "three";

/** Builds the futuristic tunnel environment */
export function buildEnvironment(scene: THREE.Scene) {
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, metalness: 0.7, roughness: 0.4 });
  const neonMat = new THREE.MeshBasicMaterial({ color: 0xe8000d });

  // Floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80, 40, 40),
    new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.9, roughness: 0.15 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  // Grid
  const grid = new THREE.GridHelper(80, 40, 0x1a0000, 0x110000);
  grid.position.y = 0.01;
  scene.add(grid);

  // Walls
  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(80, 12), wallMat);
  leftWall.position.set(-10, 6, 0);
  leftWall.rotation.y = Math.PI / 2;
  scene.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(80, 12), wallMat);
  rightWall.position.set(10, 6, 0);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(20, 80), wallMat);
  ceiling.position.set(0, 12, 0);
  ceiling.rotation.x = Math.PI / 2;
  scene.add(ceiling);

  // Neon strips
  for (let z = -30; z < 30; z += 5) {
    const stripL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 2.5), neonMat);
    stripL.position.set(-9.9, 0.6, z);
    scene.add(stripL);

    const stripR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 2.5), neonMat);
    stripR.position.set(9.9, 0.6, z);
    scene.add(stripR);

    const stripT = new THREE.Mesh(new THREE.BoxGeometry(20, 0.08, 0.08), neonMat);
    stripT.position.set(0, 11.9, z);
    scene.add(stripT);
  }

  // Speed lines
  const speedLines: THREE.Line[] = [];
  for (let i = 0; i < 60; i++) {
    const pts = [
      new THREE.Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 8 + 3, -10),
      new THREE.Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 8 + 3, -50),
    ];
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0 })
    );
    scene.add(line);
    speedLines.push(line);
  }

  return { speedLines };
}
