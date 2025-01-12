// bpm = 150; hydra.synth.time = 0;

s0.initImage('local/files/images/elena_culona_3.jpg');

a.setBins(3);
a.setCutoff(10);
a.setScale(2);
a.setSmooth(0.65);

counterValue = 0;

reactiveCounter = (audio = 0) => {
    counterValue += time * 0.0000005
    counterValue += audio * 0.3
    counterValue = counterValue % 0.78
    return counterValue
};

movement = () =>
    src(o0)
    .diff(
        voronoi(3, 0.3, 2)
        .modulate(noise(2.37))
        .colorama(() => reactiveCounter(a.fft[0]))
        .scale(() => 0.8 + reactiveCounter(a.fft[0] * 0.8))
        .scale(0.8)
        .modulateRotate(
            noise(0.35)
        )
        .modulateScale(
            src(o0)
        )
    );

src(s0)
.kaleid([3.78, 1, 1, 1])
.modulateScale(
    osc(3, 0.22, 0.75).modulateRotate(noise(0.79))
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
.out(o0);