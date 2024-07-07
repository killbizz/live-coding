(

"Starting proxy setup".postln;
p = ProxySpace.push(s);
p.makeTempoClock;
// BPM -> beats / second
p.clock.tempo_(120/60);
p.quant_(1);
p.fadeTime = 0.1;
"Proxy setup done!".postln;

)