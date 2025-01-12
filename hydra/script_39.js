// bpm = 128; hydra.synth.time = 0;

a.setBins(2);
a.setCutoff(10.5);
a.setScale(2);
a.setSmooth(0.65);

s0.initImage('local/files/images/elena_culona_5.jpg');

// src(s0).out(o0);

src(o0)
.scale(0.98)

.layer(
    src(s0)
    .blend(
        src(s0)
        .scale(0.98)
        .rotate(() => time * 0.04)
        .thresh()
        .colorama(() => time * 0.04)
    )
    .luma(0.4)
)

.out(o0);