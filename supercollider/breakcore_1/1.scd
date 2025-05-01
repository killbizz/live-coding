p.clock.tempo_(175/60);

s.plotTree();
s.meter();

// breaks175 : 1, 3, 4, 5, 6, 7, 8, 9, 10, 11

(
    ~amen.release(0); ~amen.play(fadeTime: 0);
    ~amen[0] = Pbind(
        \instrument, \slice,
        \group, ~amen.group,
        // \buf, Pfunc{d["breaks175"][[1,3,4].choose]},
        // \buf, d["abreak_180"][1],
        \buf, d["breaks175"][4],
        \sliceNum, Pseq((0..15), inf),
        // \sliceNum, Pseq([
        //     Pseq([0,1,2,3]),
        //     Pseq([4,5,6,7,7]),
        //     Pseq([8,9,10,11]),
        //     Pseq([12,13,14,3,3]),
        // ], inf),
        \dur, Pseq([1], inf),
        \amp, 0.75,
        \rate, 1,
        \gate, 1
    );
    // ~amen.play(fadeTime: 0);
)

~amen[1] = \filter -> {|in| (in * 3.25).fold2(1) * 0.575};
~amen[1] = nil;

~amen.play(fadeTime: 0);
~amen.stop();

~amen.end(0);
~amen.clear();

(
    ~bplay.release(0); ~bplay.play(fadeTime: 0);
    ~bplay[0] = Pbind(
        \instrument, \bplay,
        \buf, d["breaks175"][1],
        \dur, Pseq([1], inf),
        \amp, 0.75,
        \rate, 1,
        \gate, 1
    );
    ~bplay.play(fadeTime: 0);
)

(
    ~k[0] = Pbind(
        \instrument,\bplay,
        \buf,d["k"][0],
        \dur,Pseq([
            // Pseq([1, Rest(1), 1, 0.5, 0.5])
            Pseq([1], inf)
            ],inf),
        \amp, 0.4
    );
    ~k.play(fadeTime: 0);
)

~k.play(fadeTime: 0);
~k.stop();
~k.clear();
// ~k.end(0);
// ~k.free(0);
// ~k = nil;

(
    ~bpfbuf.release(0); ~bpfbuf.play(fadeTime: 0);
    ~bpfbuf[0] = Pbind(
        \instrument, \bpfbuf,
        \buf, Pfunc{d["synths"][6]},
        // \rate, Pwhite(0.5, 2.0),
        \spos, Pwhite(0, 0.25),
        \freq, Pfunc { (Scale.minor.degrees + 69).choose.midicps * [0.5, 1, 2].choose },
        \rq, 0.025,
        \bpfmix, Pwhite(0.85, 1),
        \amp, Pwhite(0.5, 0.6),
        \atk, 0.01,
        \sus, 0.1,
        \rel, 0.5,
        \minRepeats, 1,
        \maxRepeats, 8,
        \dur, Pseq([1, Rest(1), 1, 0.5, 0.5], inf),
    );
)

~bpfbuf.play(fadeTime: 0);
~bpfbuf.stop();
~bpfbuf.clear();

(
    ~a[0] = { RLPF.ar(Dust2.ar(5!2), LFNoise2.kr(2!2).exprange(200, 5000), 0.05) * 10 };
    ~a.play(fadeTime: 0);
)
~a[1] = \filter -> { |in| CombL.ar(in, 0.2, LFNoise2.kr(0.5!2).exprange(0.01, 0.2), 3) };
~a.clear();
~a.stop();

(
~drums = Tdef(\drums, {
    loop {
        // TODO : control synths/buffer playing, not drums
        ~amen.play(fadeTime: 0);
		d[\sync].value("osc(100, 0.4, 2).out();");
        3.wait;
		~amen.stop();
		d[\sync].value("osc(10, 0.4, 0).out()");
        1.wait;
    }
});
)

~drums.resume();
~drums.pause();