a.setBins(6);
a.setSmooth(0.4);

noise(3, () => time * 0.00003 + a.fft[0]* 0.0009).
    colorama(() => time * 0.0003)
    .modulateScale(
        src(o0)
    )
.out(o0);