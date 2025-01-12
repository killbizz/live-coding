// bpm = 174; hydra.synth.time = 0;

s0.initImage('local/files/images/texture_wall.jpg');

a.setBins(3);
a.setCutoff(8.5);
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
    gradient(2)
;

src(s0)
// .modulate(
//     movement(),
//     () => 0 + a.fft[0] * 3
// )
// .modulatePixelate(noise(3).pixelate(8,8),2048 * 3,8)
.layer(
    movement()
        .mask(
            shape(4)
            .modulatePixelate(noise(3).pixelate(8,8),2048 * 3,8)
        )
)
.invert(
    0
    // [1,0,0,0].fast(1)
)
.out(o0);