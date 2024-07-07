// loadScript("local/files/setup/hydra_to_three_setup.js");
clearScene(scene);

camera.position.set(0,0,2.5);
controls.minDistance = 2;
controls.maxDistance = 10;

scene.background = new THREE.Color(0x111111);
light = new THREE.DirectionalLight(0xffffff, 0.89);
light.position.set(-10, 3, 5).normalize();

materials = [
  new THREE.MeshStandardMaterial({ color: 0xff0000 }),
  new THREE.MeshStandardMaterial({ color: 0x0ff000 }),
  new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
  new THREE.MeshStandardMaterial({ color: 0x000ff0 }),
  new THREE.MeshStandardMaterial({ color: 0x0000ff }),
  new THREE.MeshStandardMaterial({ color: 0x0f00f0 })
];

geometry = new THREE.BoxGeometry(1,1,1);
geometry.clearGroups();
numFaces = 6; // BoxGeometry has 6 faces
for (let i = 0; i < numFaces; i++) {
  geometry.addGroup(i * 2 * 3, 6, i) // Each face has 6 vertices (2 triangles with 3 vertices each)
}

cube = new THREE.Mesh(geometry, materials);

scene.add(light);
scene.add(cube);

update = () => {
  // cube.rotation.x += 0.003
  // cube.rotation.y += 0.003
  // mainHydraTexture.needsUpdate = true
  renderer.render(scene, camera)
  controls.update()
};