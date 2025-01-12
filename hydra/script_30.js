src(o0)
    .diff(
        voronoi(3, 0.3, 2)
        .modulate(noise(2.37))
        .colorama(({time}) => time * 0.00005 + Math.sin(time * speed) * 0.25)
        .scale(0.8)
        // .modulatePixelate(noise(3).pixelate(8,8),2048 * 3,8)
        .modulateRotate(
            noise(0.35)
        )
        .modulateScale(
            src(o0)
        )
    )
.out(o0);