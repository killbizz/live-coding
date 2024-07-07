// loadScript("https://unpkg.com/three@0.130.1/build/three.min.js");

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(150, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    color: 0xff0000,
    roughness: 0
  })
);
scene.add(torusKnot);

directionalLight = new THREE.DirectionalLight(0xffffff, 0.67);
directionalLight.position.z = 3;
scene.add(directionalLight);

camera.position.z = 2;
// The update function that will be run every frame
update = () => {
  torusKnot.rotation.x += 0.01
  torusKnot.rotation.y += 0.01
  renderer.render(scene, camera)
};

s0.init({ src: renderer.domElement });
src(s0).out(o0);