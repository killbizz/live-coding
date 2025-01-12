s.plotTree();
SynthDescLib.global.browse();
s.meter();
s.scope(zoom: 0, bufsize: 8192 * 10);

(
// p.clock.tempo_(148/60);
p.clock.tempo_(180/60);
// p.clock.tempo_(170/60);
// d["beat"] = 60 / (p.clock.tempo * 60);
p.clock.tempo.clear();
)

(
p.clock.sched(p.clock.timeToNextBeat,{~amen.set(\gate, 0);});
~amen[0] = Pbind(
    \instrument, \slice,
    \buf, d["abreak_180"][1],
    \sliceNum, Pseq((0..15), inf),
    \dur, 1,
    \amp, 0.3,
    \rate, 1
);
)

p.clock.tempo / 4;
(60 / 180) / 4;

~amen.play(fadeTime: 0);
~amen.stop();
~amen.clear();
// ~amen.fadeTime_(0.01).monitor.fadeTime_(0);

(
~drums = Tdef(\drums, {
    loop {
        ~amen.play(fadeTime: 0);
		d[\sync].value("osc(100, 0.4, 2).out();");
        // d["beat"].wait;
        1.wait;
		~amen.stop();
		d[\sync].value("osc(10, 0.4, 0).out()");
        // d["beat"].wait;
        1.wait;
    }
});
)

(d["beat"]).postln();

~drums.resume();
~drums.pause();