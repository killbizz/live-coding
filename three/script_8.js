// loadScript("local/files/setup/hydra_to_three_setup.js");
clearScene(scene);

s0.initCam();
// src(o0)
//   .modulate(
//     src(s0).modulate(
//       src(s0)
//       , 0.05
//     )
//   )
src(s0)
.out(o0);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.88);
scene.background = new THREE.Color(0x111111);

getModelGeometry('local/files/models/lemon/scene.gltf').then(geometry => lemonGeometry = geometry);

lemon = new THREE.Mesh(
  lemonGeometry,
  new THREE.MeshStandardMaterial({
    // color: 0xffff00,
	  roughness: 0.8,
    map: mainHydraTexture,
	  // displacementMap: mainHydraTexture,
    // displacementScale: 0.25
  })
);

lemon.position.x = 0;
lemon.position.y = 0;
lemon.position.z = -5;
directionalLight.position.set(-2,2,3);
camera.position.set(0,0,4);
// camera.position.x = 0;

scene.add(lemon);
scene.add(directionalLight);

update = () => {
  lemon.rotation.x += 0.0034
  lemon.rotation.y += 0.0075
  mainHydraTexture.needsUpdate = true
  renderer.render(scene, camera)
};