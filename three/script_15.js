// loadScript("local/files/setup/hydra_to_three_setup.js"); 
// loadScript("local/files/setup/leapmotion_to_three_setup.js");
// getModelGeometry('local/files/models/lemon/scene.gltf').then(geometry => lemonGeometry = geometry);
// createHydraTexture('patternTexture', true).then(({hydraTexture, hydraInstance}) => [patternTexture, ph] = [hydraTexture, hydraInstance.synth]);
// createHydraTexture('movementTexture').then(({hydraTexture, hydraInstance}) => [movementTexture, mh] = [hydraTexture, hydraInstance.synth]);
// trackObjectWithDigitalizedHands2(lemon);
clearScene(scene);

// #### Main Pattern Texture ####

// bpm = 168; ph.time = 0;

ph.s0.initImage('local/files/images/texture_fabric.jpg');

ph.a.setBins(3);
ph.a.setCutoff(8);
ph.a.setScale(2);
ph.a.setSmooth(0.65);

counterValue = 0;

reactiveCounter = (audio = 0) => {
    counterValue += ph.time * 0.0000005
    counterValue += audio * 0.3
    counterValue = counterValue % 0.78
    return counterValue
};

movement = () =>
    ph.src(ph.o0)
    .diff(
        ph.voronoi(3, 0.3, 2)
        .modulate(ph.noise(2.37))
        .colorama(() => reactiveCounter(ph.a.fft[0]))
        .scale(() => 0.8 + reactiveCounter(ph.a.fft[0] * 0.8))
        .scale(0.8)
        .modulateRotate(
            ph.noise(0.35)
        )
        .modulateScale(
            ph.src(ph.o0)
        )
    );

ph.src(ph.s0)
.kaleid([3.78, 1, 1, 1])
.modulateScale(
    ph.osc(3, 0.22, 0.75).modulateRotate(ph.noise(0.79))
    ,[0.8, 0.2, 0.2, 0.2]
    // ,0.2
)
.modulate(
    movement()
)
.layer(
    movement()
        .invert(1)
        .mask(
            movement().thresh(0.4)
        )
)
.invert(
    // 0
    [1,0,0,0].fast(1)
)
.out(ph.o0);

// #### Movement Texture ####

mh.osc(8,-0.2,0).thresh(0.67).rotate(Math.PI / 5)
	.modulate(mh.noise(3), 0.04)
.out(mh.o0);

// #### THREE.JS ####

directionalLight = new THREE.DirectionalLight(0xffffff, 0.88);
scene.background = new THREE.Color(0x111111);

lemon = new THREE.Mesh(
        lemonGeometry,
        new THREE.MeshStandardMaterial({
        // color: 0xffff00,
        roughness: 0.8,
        map: patternTexture,
        // displacementMap: movementTexture,
        // displacementScale: 0.75
    })
);

lemon.position.set(5,100,-9);
lemon.scale.set(10,10,10);
directionalLight.position.set(-2,2,3);
camera.position.set(0,0,400);
// camera.position.x = 0;

scene.add(lemon);
scene.add(directionalLight);

// axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

update = () => {
  lemon.rotation.x += 0.02 * ph.a.fft[0]
//   lemon.rotation.x += 0.0004
  lemon.rotation.y += 0.01 * ph.a.fft[0]
//   lemon.rotation.y += 0.0005
  patternTexture.needsUpdate = true
//   movementTexture.needsUpdate = true
  renderer.render(scene, camera)
};