// bpm = 132; hydra.synth.time = 0;

s0.initImage('local/files/images/texture_tally_marks.jpg');

a.setBins(3);
a.setCutoff(9.5);
a.setScale(2);
a.setSmooth(0.65);

src(s0)
.scrollX([0,0.2,0.8,1])
.scale([1,1.25,1,0.97])
.layer(
    src(o0)
        .mask(
            src(o0).thresh(() => 0.48 - a.fft[0] * 0.22).modulate(
                voronoi(77.9, 0.2, 0.9)
                    .modulateRepeat(voronoi())
                , -0.001
            )
        )
)
.invert(
    [1,1,1,0]
)
// .saturate(-20)
.out(o0);