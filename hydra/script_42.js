// bpm = 150; hydra.synth.time = 0;

s0.initImage('local/files/images/michaux_untitled.jpg');

a.setBins(3);
a.setCutoff(9.1);
a.setScale(2);
a.setSmooth(0.65);

src(s0)
// .scrollX([0,0.2,0.8,1])
// .scale([1,1.25,1,0.97])
.modulateRepeat(
    src(s0)
        .scrollX(0.25).modulatePixelate(src(s0))
        // .invert(
        //     [1,1,1,0]
        // )
        // .luma(0.76, 0.001)
    , 0.45, 0.45, 0.6
)
.layer(
    src(o0)
        .mask(
            src(o0)
            .thresh(0.88)
            .modulate(
                voronoi(77.9, 0.2, 0.9)
                    .modulateRepeat(voronoi())
                    // .saturate(-20)
                , -0.00075
            )
            // .color(2,20,20)
            // .colorama(() => time * 0.005)
        )
)
// .invert(
//     [1,1,1,0]
// )
.invert(1)
// .colorama(() => time * 0.00006)
// .saturate(-20)
.out(o0);