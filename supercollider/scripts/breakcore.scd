s.plotTree();
SynthDescLib.global.browse();
s.meter();
s.scope(zoom: 0, bufsize: 8192 * 10);

// working stereo abreaks
    // \buf, d["abreak_170"][5],
    // \buf, d["abreak_180"][1],
    // \buf, d["breaks175"][1],
    // \buf, d["breaks175"][3],
    // \buf, d["breaks175"][4],
    // \buf, d["breaks175"][5],
    // \buf, d["breaks175"][6],
    // \buf, d["breaks175"][7],
    // \buf, d["breaks175"][8],
    // \buf, d["breaks175"][9],
    // \buf, d["breaks175"][10],
    // \buf, d["breaks175"][11]
// working mono abreaks
    // \buf, d["breaks175"][2]

(
p.clock.tempo_(175/60);
p.clock.tempo.clear();
)

(
~amen.release(0); ~amen.play(fadeTime: 0);

~amen[0] = Pbind(
    \instrument, \slice,
    \buf, d["breaks175"][1],
    \sliceNum, Pseq((0..15), inf),
    // \sliceNum, Pseq([
    //     Pseq([0,1,2,3]),
    //     Pseq([4,5,6,15,15])
    // ], inf),
    // \dur, Pseq([1,1,1,1,1,1,1,0.5, 0.5],inf),
    \dur, 1,
    \amp, 0.3,
    \rate, 1
);
)

~amen[1] = \filter -> {|in| (in * 8).fold2(1)};
~amen[2] = \filter -> {|in| CombL.ar(in, 5, 0.02, 3)};
~amen[2] = nil;
~amen[3] = \filter -> {|in| GVerb.ar(in, 5)};

~amen.play(fadeTime: 0);
~amen.stop();
~amen.clear();
// ~amen.fadeTime_(0).monitor.fadeTime_(0);

(
    ~a[0] = { RLPF.ar(Dust2.ar(5!2), LFNoise2.kr(2!2).exprange(200, 5000), 0.05) * 10 };
    ~a.play(fadeTime: 0);
)
~a[1] = \filter -> { |in| CombL.ar(in, 0.2, LFNoise2.kr(0.5!2).exprange(0.01, 0.2), 3) };

(
~k[0] = Pbind(
    \instrument,\bplay,
    \buf,d["k"][0],
    \dur,Pseq([
        Pseq([1,1,1,1])
        ],inf),
    \amp,1
);
)

~k.play(fadeTime: 0);
~k.stop();

(
~drums = Tdef(\drums, {
    loop {
        // TODO : control synths/buffer playing, not drums
        ~amen.play(fadeTime: 0);
		// d[\sync].value("osc(100, 0.4, 2).out();");
        3.wait;
		~amen.stop();
		// d[\sync].value("osc(10, 0.4, 0).out()");
        1.wait;
    }
});
)

~drums.resume();
~drums.pause();