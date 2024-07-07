// loadScript("local/files/setup/three_to_hydra_setup.js");

torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 1000, 16),
  new THREE.MeshStandardMaterial({
    color: 0xffffff
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
  renderer.render(scene, camera)
};

s0.init({ src: renderer.domElement });
src(o0)
	.scale(1.005)
	.layer(
		src(s0)
		.mult(
			noise().modulatePixelate(noise(10000)).colorama(() => time * 0.0009).saturate(0.05)
		)
		.luma(0.058)
	)
	.modulate(src(o0), 0.0009)
.out(o0);