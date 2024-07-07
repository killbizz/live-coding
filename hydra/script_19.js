s1.initImage("local/files/images/bojack.jpg");

// head emphasized mask
src(s1)
    .scale(1.34, 0.45)
    .mask(
        shape(50, 0.45, 0.2)
        .scale(0.835, 0.85, 1.1).scrollX(0.89).scrollY(0.24)
        .invert()
    )
    .invert()
.out(o1);

// head emphasized bojack
src(s1)
.scale(1.34, 0.45)
.mask(src(o1))
// water effect
.modulate(
    src(s1)
    .scale(1.34, 0.45)
    // .invert()
    .luma(0.95, 0.7)
    .scroll(0,0
        ,() => 0.12 + Math.sin(Math.PI)*0.35
        ,() => 0.12 + Math.sin(Math.PI)*0.75
    )
    .modulate(src(s1), 0.23)
    ,0.048
)
// src(o1)
.out(o0);