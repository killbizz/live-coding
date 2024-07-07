s1.initImage("local/files/images/bojack.jpg");

clip = (value, min, max) => Math.max(min, Math.min(max, value));
// x = () => mouse.x/width;
// y = () => mouse.y/height;

// noise(2.75)
// .colorama(() => time * 0.0005)
osc(
    5
    ,() => clip(-0.27 + (Math.sin(time * 1.45) ** 32) * 0.9, -0.11, 0.14)
    // , -0.27
    // ,() => 0.25 + Math.sin(time * 5) * 0.25
    , 0.25
)
.kaleid(7)
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
    .scale(1.34, 0.45)
    .scrollX(0.15)
    .modulate(
        src(o0)
        .invert()
        .luma(0.95, 0.7)
        // .invert()
        .scroll(0,0,0.2,0.3)
    )
)
.out(o0);