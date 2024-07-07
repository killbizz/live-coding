s0.initImage("local/files/images/sculture_culone.jpg");

src(o1).out(o0);

// osc(5, 0.3, 2)
solid(1,0,0)
.diff(
    src(s0)
    .invert()
    // .contrast(0.5)
    // .brightness(0.6)
    .luma(0.55, 0.005)
    .invert()
)
.out(o1);

voronoi(5).out(o2);

src(o0)
.scale(0.99995)
.rotate(() => Math.sin(time/4)*0.01)
.layer(
    src(o1)
    .luma(0.82, 0.0001)
)
.out(o0);

// src(o0)
//     .scale(0.9998)
//     .rotate(0.0071)
//     .blend(o1, 0.001)
// .out(o0);