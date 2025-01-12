// loadScript("https://emptyfla.sh/bitfolly/bundle-global.js");

window.bitfolly = window.bitfolly || new Bitfolly(() => a.fft);
bitfolly.update("Math.tan(x|y^t/30)*10");

s0.init({
    src: bitfolly.canvas
});

src(s0)
	.diff(src(o0).scale(.995))
.out();