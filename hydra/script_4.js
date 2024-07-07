shape(3, 0.1)
.modulateScale(
    noise(100),
    () => 0 + a.fft[0] * 8
)
.mult(
    osc(20,1,20)
    .rotate(() => time%360)
    .scale(() => time%360)
    , () => 0 + a.fft[0] * 0.9
)
// .modulateRepeat(
//     voronoi(25)
//     .modulateScale(
//         src(o0)
//         .scale(() => 2 + a.fft[0]/3)
//     )
// )
.modulate(
    noise(15, () => 0.5 + Math.sin(time/1000)*a.fft[0]/3000)
)
.scale(() => 0.8 + a.fft[0]*0.4)
.out(o0);