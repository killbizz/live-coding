async function initialize() {
  	// dependencies
	await loadScript("https://unpkg.com/three@0.130.1/build/three.min.js");
	await loadScript("https://cdn.jsdelivr.net/npm/three@0.130.1/examples/js/loaders/GLTFLoader.min.js");
	await loadScript("https://cdn.jsdelivr.net/npm/three@0.130.1/examples/js/controls/OrbitControls.min.js");

  	await loadScript("files/setup/utils.js");

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });

	function onWindowResize() {
		const width = window.innerWidth
		const height = window.innerHeight

		renderer.setSize(width, height)
		camera.aspect = width / height
		camera.updateProjectionMatrix()
	}

	window.addEventListener('resize', onWindowResize)

	const resolutionWidth = 1920
	const resolutionHeight = 1080
	renderer.setSize(resolutionWidth, resolutionHeight)
	renderer.setPixelRatio(window.devicePixelRatio || 1)
	document.body.appendChild(renderer.domElement)

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true
	controls.dampingFactor = 0.25
	controls.screenSpacePanning = false

	mainHydraCanvas = document.getElementById("main-hydra-canvas")
	mainHydraCanvas.style.display = 'none'
	mainHydraTexture = new THREE.CanvasTexture(mainHydraCanvas)

	onWindowResize()
}

initialize();