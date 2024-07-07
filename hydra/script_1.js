osc(1,.5,1).out();

solid([1,0,0].fast(4),0,0).out();

s0.initCam();
src(s0).out(o0);
osc(10, 0.2, 0.8).diff(o0).out(o1);
render(o1);
render(o0);

shape(4, (0.01, ()=> 0.2 + a.fft[2]),1)
.mult(osc(1, 1).modulate(osc(5).rotate(1.4,1),3))
.color(1,2,4)
.saturate(0.2)
.luma(1.2,0.05, (5, ()=> 2 + a.fft[3]))
.scale(0.6, ()=> 0.9 + a.fft[3])
.diff(o0)
.out(o0);

s0.initCam();
s2.initScreen();
src(s2).kaleid(4).out();
src(s0).out();
osc(10,0.5,1).out();
solid(.2,.2,.2).out();