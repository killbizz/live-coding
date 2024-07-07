shape(2, 0.2, 0.01)
.scale(() => (Math.sin(time/2) * 0.05) + 0.4 * a.fft[0] * 6)
.mult(
    osc(15,1,2)
    .modulate(
        noise(100)
        .kaleid(3)
    )
    , () => -0.5 + a.fft[0] * 4
)
.repeat(0.7,3.1,() => Math.sin(time/2),() => Math.sin(time/2))
.modulateRepeat(
    noise(3)
)
.out(o0);