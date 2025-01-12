s0.initImage('local/files/images/elena_culona_3.jpg');

// bpm = 164;

src(s0)
// .kaleid(7)
.modulateScale(
    osc(3, 0.22, 0.75).modulateRotate(noise(0.79))
    ,0.2
)
// .brightness(-0.11)
// .contrast(4)
// .invert([0,1].fast(0.5))
.modulate(
    src(o0)
    .diff(
        voronoi(() => 3 - a.fft[0] * 0.05, 0.3, 2)
        .modulate(noise(2.37))
        .colorama(({time}) => time * 0.00005 + Math.sin(time))
        .scale(0.8)
        // .modulatePixelate(noise(3).pixelate(8,8),2048 * 3,8)
        .modulateRotate(
            noise(0.35)
        )
        .modulateScale(
            src(o0)
        )
    )
)
// .layer(
//     src(o0)
//     .mask(
//         noise(1.36).modulateRotate(noise(0.79)).thresh()
//     )
// )
// .invert([0,1].fast(0.5))
.out(o0);