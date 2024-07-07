// loadScript("local/files/setup/hydra_to_three_setup.js");
clearScene(scene);

src(o0)
	.colorama(0.7/10)
	.scale(.96)
	.layer(noise().luma(.1))
.out();

// osc(5, 0.5, 2).out(o0);

scene.background = new THREE.Color(0x111111);
// scene.background = mainHydraTexture;

getModelGeometry('local/files/models/lemon/scene.gltf').then(geometry => lemonGeometry = geometry);

lemon = new THREE.Mesh(
  lemonGeometry,
  new THREE.MeshStandardMaterial({
    color: 0xffff00,
	  roughness: 0.8,
    map: mainHydraTexture,
	  // displacementMap: mainHydraTexture,
    // displacementScale: 0.25
  })
);
directionalLight = new THREE.DirectionalLight(0xffffff, 1);

lemon.position.x = 0;
lemon.position.y = 0;
lemon.position.z = 0;
directionalLight.position.z = 3;
camera.position.z = 15;
// camera.position.x = 0;

scene.add(directionalLight);
scene.add(lemon);

update = () => {
  lemon.rotation.x += 0.0034
  lemon.rotation.y += 0.0075
  mainHydraTexture.needsUpdate = true
  renderer.render(scene, camera)
};