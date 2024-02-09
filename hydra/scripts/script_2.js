shape(99, 0.7)
    .repeat(2, 1)
    .modulateScrollX(
        osc(2, 0.2, 9)
    )
    .diff(
        src(o0)
        .repeat(2,2)
        .modulateRepeat(
            noise(3)
        )
    .scale(() => 1.01 + a.fft[0]/3)
    )
    .blend(o0, 0.1)
.out(o0);