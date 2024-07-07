shape(100, 0.30, 0.01)
.color(0.44,0.11,0.06)
.rotate(({time})=>(time%360)/2)
.mult(
    voronoi(7, 0.25, 0.57)
    .modulate(
        shape(100, 0.5, 0.01)
        .rotate(({time})=>(time%360)/2)
        .modulate(
            noise(20,0.3)
            .modulateRepeat(
                noise(35)
            )
        )
    )
    .brightness(0.46)
)
.modulate(
    osc(25,0.1,0.01)
    .scale(({time})=>Math.sin(time*1)*0.5+1)
    .modulate(noise(0.6,0.3))
    ,0.065
)
.scrollX(() => 0.15 + Math.sin(time*1)*0.015)
.layer(
    shape(100, 0.23, 0.01)
    .luma()
    .color(0.42,0.24,0.16)
    .rotate(({time})=>(time%360)/2)
    .mult(
        voronoi(5, 0.25, 0.65)
        .modulate(
            shape(100, 0.17, 0.01)
            .rotate(()=>(time%360)/2)
            .modulate(noise(0.6,0.3))
            .brightness(30)
            .layer(
                shape(100, 0.17, 0.01)
                // .luma()
                // .rotate(()=>(time%360)/2)
                .modulate(noise(0.98,0.3))
                .scale(0.9)
                .modulate(src(o0))
                // .scroll(80,100)
                .brightness(0.875)
            )
        )
    )
    .modulate(
        osc(25,0.1,0.01)
        .scale(({time})=>Math.sin(time*1)*0.5+1)
        .modulate(noise(0.87,0.3))
        ,0.065
    )
    .scrollX(() => 0.75 + Math.sin(time*1)*0.015)
)
.out(o0);