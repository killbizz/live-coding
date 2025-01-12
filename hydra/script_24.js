// loadScript("https://unpkg.com/total-serialism/build/ts.es5.min.js");

Rand = TotalSerialism.Stochastic;
r = Rand.shuffle([1,0.5,0.6,.2,-1]).ease('easeInOutQuad');
g = Rand.shuffle([1,0.5,-0.6,0.8,-1]).ease('easeInOutQuad');
b = Rand.shuffle([1,0.5,0.6,2,-1]).ease('easeInOutQuad');

osc(10,0.1,0).color(r,g,b).mult(noise(3))
.add(src(o0).scrollX(0.1),0.8)
.hue(0.01).out();