// loadScript("https://unpkg.com/three@0.130.1/build/three.min.js");

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

// Create the geometry and material
geometry = new THREE.BoxGeometry();
edges = new THREE.EdgesGeometry(geometry);
material = new THREE.LineBasicMaterial({ color: 0xffffff });
cube = new THREE.LineSegments(edges, material);

scene.add(cube);
camera.position.z = 1.5;

// The update function that will be run every frame
update = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
};

s0.init({ src: renderer.domElement });

src(s0).out(o0);