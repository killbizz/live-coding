// loadScript("local/files/setup/hydra_to_three_setup.js");
// createHydraTexture('oscTexture').then(({hydraTexture, hydraInstance}) => [oscTexture, oh] = [hydraTexture, hydraInstance.synth]);
// createHydraTexture('emojiTexture').then(({hydraTexture, hydraInstance}) => [emojiTexture, eh] = [hydraTexture, hydraInstance.synth]);

// Osc Texture

oh.osc(8,-0.2,0).thresh(0.67).rotate(Math.PI / 5)
	.modulate(oh.noise(3), 0.04)
.out(oh.o0);

// Emoji Texture

eh.s0.initImage('local/files/images/Hot_Emoji.png');
eh.s1.initImage('local/files/images/Cold_Emoji.png');

eh.solid(0.15,0.15,0.15)
	.layer(
		eh.src(eh.s0)
		.scale(0.077, 1, 4/3)
		.layer(
			eh.solid(0.15,0.15,0.15)
			.add(
			eh.src(eh.s1)
			.scale(0.077, 1, 4/3)
			)
			.mask(
				eh.osc(8,-0.2,0).thresh(0.67).rotate(Math.PI / 5)
				.modulate(eh.noise(3), 0.04)
			)
		)
	)
.out(eh.o0);