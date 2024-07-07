a.setBins(6);
a.setSmooth(0.4);

voronoi(3)
.modulate(
    noise(
        3, () => time * 0.000004
    )
)
.colorama(() => Math.sin(time/10))
.modulateScale(
    src(o0)
    .modulateScale(
        noise(() => 100 + Math.abs(Math.sin(time/1000)*400))
    )
)
.blend(
    src(o0)
)
.out(o0);