// color 
osc(13, 0.25, 2)
.modulateKaleid(src(o1))
.modulateHue(
    src(o0).scale(1.02)
)
// textures
.mult(
    voronoi(7.7, 0.25, 0)
    .modulateRotate(
        voronoi(2.75, 0.25, 1.23)
        .scale(0.90)
        .thresh(0.08, 0.002)
        , 0.80
    )
    .brightness(0.80)
    .contrast(2.5)
)
.modulate(
    osc(9.35,0.1,0.02)
    .modulate(noise(0.87,0.22))
    .modulateKaleid(
        osc(2.65,0.075,0)
        .modulateRotate(noise(2.34,0.22))
        ,0.25
    )
    ,0.069
)
// geometries
.mult(
    shape(4, 0.68)
    .modulatePixelate(
        // noise(1.8, 0.3)
        osc(3, 0.25, 0).kaleid(100).modulateRepeat(src(o0))
    )
)
.out(o1);

src(o0)
    // pattern chain
    .modulate(o0, 0.003)
    // .scrollX(0.0005)
    .rotate(0.005)
    .blend(o1, 0.33)
.out(o0);