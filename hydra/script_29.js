s0.initImage('local/files/images/elena_culona_3.jpg');
// s1.initImage('local/files/images/elena_culona_4.jpg');

src(s0)
// .kaleid(7)
.modulateScale(
    osc(3, 0.22, 1.75)
    .modulateRotate(noise(0.79))
)
.modulate(
    src(o0)
    .diff(
        voronoi(() => 3 - a.fft[0] * 0.25, 0.3, 2)
        .modulate(noise(2.37))
        .colorama(({time}) => time * 0.00005 + Math.sin(time) * 0.75 + a.fft[0] * 0.25)
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
.out(o0);