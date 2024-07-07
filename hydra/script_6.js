a.setBins(7);
a.setSmooth(0.2);

voronoi(
    1000
    , 2
    , () => time * 0.0005 + a.fft[0] * -15 + 5)
.mult(
    shape(7, 2, 0.01)
    .mult(
        noise(3,() => time * 0.0005 + a.fft[2] * 0.008)
    )
    , () => -0.8 + a.fft[0] * 0.9
)
.brightness(-0.5)
.add(
    osc(3,1,() => -2 + a.fft[0] * 0.8)
    .modulateRepeat(
        noise(5, () => time * 0.000008 + a.fft[0] * 0.0009)
    )
)
.out(o0);