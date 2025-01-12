bpm = 128; hydra.synth.time = 0;

s0.initImage('local/files/images/elena_culona_5.jpg');

// src(s0).out(o0);

src(o0)
.scale(0.98)
.layer(
    src(s0)
    .contrast([-1.3, 2.5])
    .scrollX([-0.01, -0.04, -0.05])
    .scale([1.2, 1.15, 1.6])
    // .kaleid(() => Math.sin(time) * 500)
    .luma(0.3)
)
// .kaleid(() => Math.sin(time))

.out(o0);