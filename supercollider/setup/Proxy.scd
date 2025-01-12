(

"Starting proxy setup".postln;
p = ProxySpace.push(s);
p.makeTempoClock;
// BPM -> beats / seconds
p.clock.tempo_(120/60);
// every change is active every new beat
p.quant_(1);
p.fadeTime = 0;

"Proxy setup done!".postln;

)