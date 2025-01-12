feedbackIntensity = .55;

src(o0)
	.colorama(() => feedbackIntensity/10)
	.scale(.96)
	.layer(noise().luma(.2).color(0.2,0.2,0.2))
.out();