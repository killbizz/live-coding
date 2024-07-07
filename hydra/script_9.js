a.setBins(6);
a.setSmooth(0.4);

noise(3)
.modulate(
    voronoi(() => 3 + Math.abs(Math.sin(time/1000)*10))
)
.colorama(() => Math.sin(time/10))
.modulateScale(
    src(o0)
    .modulateScale(
        voronoi(() => 2 + Math.abs(Math.sin(time/1000)*2))
    )
)
.blend(
    src(o0)
)
.out(o0);