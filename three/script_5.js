// loadScript("local/files/setup/hydra_to_three_setup.js");

clearScene(scene);

src(o0)
	.colorama(0.7/10)
	.scale(.96)
	.layer(noise().luma(.1))
	.out();

hydraTexture = new THREE.CanvasTexture(document.getElementById("myCanvas"));

torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 1000, 16),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
	roughness: 0,
	map: hydraTexture
  })
);
scene.add(torusKnot);
directionalLight = new THREE.DirectionalLight(0xffffff, 0.92);
directionalLight.position.z = 3;
scene.add(directionalLight);
camera.position.z = 2;
// camera.position.x = 1.6;

update = () => {
  torusKnot.rotation.x += 0.015
  torusKnot.rotation.y += 0.015
  hydraTexture.needsUpdate = true
  renderer.render(scene, camera)
};