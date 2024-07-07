// loadScript("https://unpkg.com/three@0.130.1/build/three.min.js");

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 0.1, 1000);

renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
geometry = new THREE.BoxGeometry();
material = new THREE.MeshBasicMaterial({color: 0x00ff00});
cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 1.5;

// 'update' is a reserved function that will be run every time the main hydra rendering context is updated
update = () => {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render( scene, camera )
};

s0.init({ src: renderer.domElement });

src(o0)
    .scale(0.98)
    .layer(
        src(s0)
        .scrollX(() => time * 0.04)
        .luma(0.5)
    )
.out(o0);