// s1.initVideo('local/files/videos/snorkel_maresme.mp4');
// src(s0)
// .out(o0);

// loadScript("https://emptyfla.sh/bl4st/bundle-global.js");

flameEngine.setConfig(
    flame()
    .colorful(.7)
    .mapExposure(2)
    .addTransform(
        transform()
        .hyperbolic()
        .rotateX()
        .build()
    )
    .addTransform(
        transform()
        .fisheye()
        .rotateY()
        .build()
    )
    .addTransform(
        transform()
        .fisheye()
        .rotateO()
        .build()
    )
);

flameEngine.start();

s0.init({
    src: flameEngine.canvas
});

src(o0)
    .layer(
        src(s0)
        .luma())
    .scale(1.002)
    .modulateRotate(noise(1), .01)
	// .modulate(src(s1), 0.04)
	.mask(
		shape(4, 0.6,0.3)
	)
.out(o0);