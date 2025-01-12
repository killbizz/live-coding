// loadScript("local/files/setup/hydra_to_three_setup.js");
// getModelGeometry('local/files/models/lemon/scene.gltf').then(geometry => lemonGeometry = geometry);
// createHydraTexture('oscTexture').then(({hydraTexture, hydraInstance}) => [oscTexture, oh] = [hydraTexture, hydraInstance.synth]);
// createHydraTexture('emojiTexture').then(({hydraTexture, hydraInstance}) => [emojiTexture, eh] = [hydraTexture, hydraInstance.synth]);
clearScene(scene);

// Osc Texture

oh.osc(8,-0.2,0).thresh(0.67).rotate(Math.PI / 5)
	.modulate(oh.noise(3), 0.04)
.out(oh.o0);

// Emoji Texture

eh.s0.initImage('local/files/images/Hot_Emoji.png');
eh.s1.initImage('local/files/images/Cold_Emoji.png');

eh.solid(0.15,0.15,0.15)
	.layer(
		eh.src(eh.s0)
		.scale(0.077, 1, 4/3)
		.layer(
			eh.solid(0.15,0.15,0.15)
			.add(
			eh.src(eh.s1)
			.scale(0.077, 1, 4/3)
			)
			.mask(
				eh.osc(8,-0.2,0).thresh(0.67).rotate(Math.PI / 5)
				.modulate(eh.noise(3), 0.04)
			)
		)
	)
.out(eh.o0);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.88);
scene.background = new THREE.Color(0x111111);

lemon = new THREE.Mesh(
        lemonGeometry,
        new THREE.MeshStandardMaterial({
        // color: 0xffff00,
        roughness: 0.8,
        map: emojiTexture,
        displacementMap: oscTexture,
        displacementScale: 0.75
    })
);

lemon.position.set(0,0,-9);
directionalLight.position.set(-2,2,3);
camera.position.set(0,0,4);
// camera.position.x = 0;

scene.add(lemon);
scene.add(directionalLight);

update = () => {
  lemon.rotation.x += 0.0034
  lemon.rotation.y += 0.0075
  emojiTexture.needsUpdate = true
  oscTexture.needsUpdate = true
  renderer.render(scene, camera)
};