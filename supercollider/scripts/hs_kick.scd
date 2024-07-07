(
~k[0] = Pbind(
    \instrument,\bplay,
    \buf,d["k"][0],
    \dur,Pseq([
        Pseq([1,1,1,1,1,1,1,0.5,0.5]),
        Pseq([1,1,1,1,1,1,1,0.75,0.25])
        ],inf),
    \amp,1,
    \rate,0.68   
);
)

~k.scope(1, bufsize: 8192 * 10);

~k.play();
~k.stop();

p.clock.tempo = 140/60;

(
    ~k[1] = \filter -> {|in| (in * 5).clip2(1)};
    ~k[3] = \filter -> {|in| BPeakEQ.ar(in, 100, 1, 12)};
    ~k[5] = \filter -> {|in| (in * 2).fold2(0.95)};
    ~k[7] = \filter -> {|in| BHiPass.ar(in, 200, 1)};
    ~k[9] = \filter -> {|in| BPeakEQ.ar(in, 150, 1, 10)};
    ~k[11] = \filter -> {|in| (in * 3).fold2(0.95)};
    ~k[13] = \filter -> {|in| BPeakEQ.ar(in, 50, 1, 3)};
    ~k[15] = \filter -> {|in| (in * 12).softclip};
)

(
~k[6] = nil;
)