s1.initImage("local/files/images/novella_estone.jpg");

clip = (value, min, max) => Math.max(min, Math.min(max, value));
// x = () => mouse.x/width;
// y = () => mouse.y/height;

// noise(2.75)
// .colorama(() => time * 0.0005)
osc(
    5
    ,() => clip(-0.27 + (Math.sin(time * 1.45) ** 32) * 0.9, -0.13, 0.28)
    // , -0.27
    ,() => 0.25 + Math.sin(time * 5) * 0.25
)
.kaleid(100)
.modulateScale(
    noise(2.75)
    .modulate(
        src(o0)
    )
    , 0.25
)
.brightness(-0.39)
// .colorama(() => time * 0.000005)
.add(
    src(s1)
    .modulate(
        src(o0)
        // .invert()
        .luma(0.95, 0.75)
        // .invert()
    )
)
.out(o0);