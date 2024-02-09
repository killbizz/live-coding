(

"Starting proxy setup".postln;
p = ProxySpace.push(s);
p.makeTempoClock;
// BPM -> beats / second
p.clock.tempo = 120/60;
p.quant = 4;
p.fadeTime = 0.1;
"Proxy setup done!".postln;

)