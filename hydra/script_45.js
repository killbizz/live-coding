// bpm = 100; hydra.synth.time = 0;

a.setBins(3);
a.setCutoff(8.25);
a.setScale(2);
a.setSmooth(0.65);

s0.initImage('local/files/images/elena_1.jpg');

solid()
.colorama(({time}) => 2 + time * 0.0022 + a.fft[0] * 0.125)
.layer(
  shape(3, 0.3)
    .rotate(Math.PI)
    .scale(1, 0.9)
    .scroll(0, 0.18)
    .thresh().color(1,0,0)
    .add(
    shape(999, 0.25)
    .scroll(-0.12, 0)
    .thresh().color(1,0,0)
    .add(
      shape(999, 0.25)
        .scroll(0.12, 0)
        .thresh().color(1,0,0)
      )
  )
  .rotate(Math.PI)
  .scrollY(0.2)
  .color(1, 0, 0)
  .scrollX([0.8,0.27,0.52,1.38].fast(0.25))
  .scale([1.56,1.35,0.56,1.78].fast(0.25))
  .scale(0.1)
  .luma(0.2, 0.01)
)
.out(o1);

src(o1)
.layer(
    src(s0)
    .scale(1,9/22)
    // .scale(() => 0.85 + a.fft[0] * 0.125, 9/16)
    // .mask(shape(4,0.75).scale(1,9/16,1, 0.475).scrollX(0.01).scrollY(-0.008))
    .scrollX(-0.05)
    // .luma(0.165, 0.05)
    // .luma(0.165, -0.02)
    .luma(0.265, -0.02)
    // .contrast(2.4)
    // .invert()
    // .saturate(-1.2)
    // .blend(src(o1), 0.009)
    .modulatePixelate(noise(3).pixelate(8,8),2048 * 3,8)
    .modulate(
        src(s0)
        .luma(1.56, 0.7)
        .scroll(0,0
            ,() => 0.12 + Math.sin(Math.PI)*0.35
            ,() => 0.12 + Math.sin(Math.PI)*0.75
        )
        .modulate(src(s0), 0.23)
        ,0.048
    )
)
.out(o0);