solid(1,0,0).out();

// reset
solid().out();

// feedback exp
shape(4, 0.5, 0.1)
.diff(
    src(o0)
    .scale(() => 0.01 + Math.sin(time))
    .kaleid(2)
)
.scale(() => Math.sin(time) * 0.2 + 0.8)
.out(o0);

// trying blending between shapes and some operations on them
// also using JS variables
let scaleFun = () => 0.5 + Math.sin(time) * -0.12;

scaleFun = () => 0.5 + Math.sin(time) * 1.2;

shape(3, 0.1, 0.1)
.color(1, 0 , 0)
.rotate(1 * Math.PI)
.scale(scaleFun)
.blend(
    shape(3, .5, .1)
        .color(0, 1, 0)
        .scale(() => 0.5 + Math.sin(time) * 0.2),
    0.1
)
.out();