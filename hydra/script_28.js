s0.initImage("https://cdn.glitch.com/da851b3d-b057-45b8-88ca-2008e8f55c59%2FFile_002.jpeg?v=1609456348744");

src(o0)
	.modulate(gradient().pixelate(2,2).brightness(-0.5), -0.1)
	// .scroll(0.01, -0.01)
  	.modulateScrollX(noise(3).thresh(0,0.5).pixelate(8,8),0.1)
  	// .modulateScrollY(noise(6).thresh(0,0.5).pixelate(8,8),0.1)
  	.layer(
		src(s0).mask(shape(4,0.7,0.02)).scale(1,9/16/(5/3))
	)
.out();