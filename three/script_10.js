// loadScript("local/files/setup/hydra_to_three_setup.js");
clearScene(scene);

controls.minDistance = 2;
controls.maxDistance = 20;

src(o0)
	.colorama(0.75/10)
	.scale(.96)
	.layer(noise().luma(.1))
  // .modulatePixelate(noise(3).pixelate(8,8),2048 * 3,8)
.out(o0);

// scene.background = new THREE.Color(0x202020);
scene.background = mainHydraTexture;
ambientLight = new THREE.AmbientLight( 0xcccccc );
light = new THREE.DirectionalLight(0xffffff, 1);

getModel('local/files/models/tree/scene.glb').then(obj => object = obj);

object.scene.traverse((child) => {
  if (child.isMesh && child.name === 'leaves001') {
    newMaterial = new THREE.MeshStandardMaterial({
        color: 0x10c7530,
        roughness: 0.8,
        metalness: 0.2,
        map: mainHydraTexture,
        displacementMap: mainHydraTexture,
        displacementScale: 1.3,
        // normalMap: mainHydraTexture,
        // wireframe: true,
        // emissive: 0xffffff,
        // emissiveMap: mainHydraTexture,
        // emissiveIntesity: 0.3
      })
    child.material = newMaterial
    // child.geometry.scale(0.95,0.95,0.95)
  }
  if(child.isMesh && child.name === 'tree001'){
    newMaterial = new THREE.MeshStandardMaterial({
      color: 0x873e23,
      roughness: 0.8,
      metalness: 0.1
    })
  child.material = newMaterial
  }
});

// depth, height, rotation
camera.position.set(-45,-30,-50);
light.position.set(-5,-200,20).normalize();
controls.target.set(5,-1,-2);
// boh, height, boh
object.scene.position.set(0,-9,-5);

scene.add(ambientLight);
scene.add(light);
scene.add(object.scene);

update = () => {
  // tree.rotation.x += 0.0034
  // tree.rotation.y += 0.0075
  mainHydraTexture.needsUpdate = true
  renderer.render(scene, camera)
  controls.update()
};