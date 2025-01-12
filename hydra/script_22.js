s0.initImage('local/files/images/Hot_Emoji.png');
s1.initImage('local/files/images/Cold_Emoji.png');

solid(0.15,0.15,0.15)
	.layer(
		src(s0)
		.scale(0.077, 1, 4/3)
		.layer(
			solid(0.15,0.15,0.15)
			.add(
			src(s1)
			.scale(0.077, 1, 4/3)
			)
			.mask(
				osc(8,-0.2,0).thresh(0.67).rotate(Math.PI / 5)
				.modulate(noise(3), 0.04)
			)
		)
	)
.out(o0);