s0.initImage('local/files/images/sogno_figo.png');

shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7].smooth(1))
.color(0.2,0.4,0.3)
.scrollX(()=>Math.sin(time*0.27))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.5,0.3].smooth(1))
  .color(0.6,0.2,0.5)
  .scrollY(0.35)
  .scrollX(()=>Math.sin(time*0.33)))
.add(
  shape([4,5,6].fast(0.1).smooth(1),0.000001,[0.2,0.7,0.3].smooth(1))
  .color(0.2,0.4,0.6)
  .scrollY(-0.35)
  .scrollX(()=>Math.sin(time*0.41)*-1))
.add(
      src(o0).shift(0.001,0.01,0.001)
      .scrollX([0.05,-0.05].fast(0.1).smooth(1))
      .scale([1.05,0.9].fast(0.3).smooth(1),[1.05,0.9,1].fast(0.29).smooth(1))
      ,0.85)
.modulate(voronoi(10,2,2))
.out(o1)

src(o1)
.layer(
    src(s0)
    .scale(1, 9/16)
    .luma(0.165, 0.05)
    .colorama(() => time * 0.0008)
    .brightness(-2.5)
    .contrast(0.24)
    .invert()
    .saturate(-4.5)
    .blend(src(o1), 0.009)
    .modulatePixelate(noise(3).pixelate(8,8),2048 * 3,8)
    .modulate(
        src(s0)
        .luma(0.2, 0.7)
        .scroll(0,0
            ,() => 0.12 + Math.sin(Math.PI)*0.35
            ,() => 0.12 + Math.sin(Math.PI)*0.75
        )
        .modulate(src(s0), 0.23)
        ,0.048
    )
)
.out(o0);