async function initialize() {
    // dependencies
	await loadScript("https://unpkg.com/three@0.130.1/build/three.min.js");
	await loadScript("https://cdn.jsdelivr.net/npm/three@0.130.1/examples/js/loaders/GLTFLoader.min.js");
	await loadScript("https://cdn.jsdelivr.net/npm/three@0.130.1/examples/js/controls/OrbitControls.min.js");

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
    renderer.setSize(width, height);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true
	controls.dampingFactor = 0.25
	controls.screenSpacePanning = false
}

initialize();