// loadScript("local/files/setup/hydra_to_three_setup.js");

clearScene(scene);

src(o0)
	.colorama(0.7/10)
	.scale(.96)
	.layer(noise().luma(.1))
	.out();

hydraTexture = new THREE.CanvasTexture(document.getElementById("myCanvas"));

sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
	  roughness: 0.8,
    metalness: 0.2,
    // map: hydraTexture,
	  displacementMap: hydraTexture,
    displacementScale: 0.25,
	  // normalMap: hydraTexture,
    // wireframe: true,
    emissive: 0xffffff,
	  emissiveMap: hydraTexture,
    emissiveIntesity: 0.3
  })
);
scene.add(sphere);
// directionalLight = new THREE.DirectionalLight(0xffffff, 0.92);
// directionalLight.position.z = 3;
// directionalLight.position.x = 1.3;
// scene.add(directionalLight);
camera.position.z = 1.3;
// camera.position.x = 0;

update = () => {
  sphere.rotation.x += 0.0034
  sphere.rotation.y += 0.0075
  hydraTexture.needsUpdate = true
  renderer.render(scene, camera)
};