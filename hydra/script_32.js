s0.initImage('local/files/images/elena_culona_3.jpg');

// bpm = 160;
// arr = (first = 1)=> [first,1,1,1];

movement = (speed = 0.5) =>
    src(o0)
    .diff(
        voronoi(3, 0.3, 2)
        .modulate(noise(2.37))
        .colorama(({time}) => time * 0.00005 + Math.sin(time * speed) * 0.35)
        // .colorama(arr(1.08).fast(1).ease('easeInQuad'))
        .scale(0.8)
        .modulateRotate(
            noise(0.35)
        )
        .modulateScale(
            src(o0)
        )
    );

src(s0)
// .kalei(7)
.modulateScale(
    osc(3, 0.22, 0.75).modulateRotate(noise(0.79))
    ,0.2
)
.modulate(
    movement()
)
.layer(
    movement()
        .invert(1)
        .mask(
            movement().thresh(0.4)
        )
)
.invert([0,0,0,1].fast(1))
.out(o0);