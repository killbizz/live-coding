(
~sn = Pbind(\instrument,\bplay,\buf,d["s"][0],\dur,Pwhite(1,5.0).round(1),\amp,0.5);
// ~h = Pbind(\instrument,\bplay,\buf,d["ch"][0],\dur,Pwhite(0.25,0.75).round(0.25),\amp,Pwhite(0.2,1));
~c = Pbind(\instrument,\bplay,\buf,d["c"][0],\dur,Pwhite(0.75,2).round(0.75),\amp,0.5);
~t = Pbind(\instrument,\bplay,\buf,d["t"][0],\dur,Pwhite(1,5.0).round(0.5),\amp,0.5);
~sn.play;~h.play;~c.play;~t.play;
)

(
~k[0] = Pbind(
    \instrument,\bplay,
    \buf,d["k"][0],
    \dur,Pseq([
        Pseq([1,1,1,1,1,1,1,0.5,0.5]),
        Pseq([1,1,1,1,1,1,1,0.75,0.25])
        ],inf),
    \amp,1
);
)

(
~h[0] = Pbind(
    \instrument,\bplay,
    \buf,d["ch"][0],
    \dur,Pseq([0.5,Pseq([1],inf)],inf),
    \amp,Pexprand(0.5,0.6)
);
)

~h.play();
~h.stop();

~k.scope(1, bufsize: 8192 * 10);

~k.play();
~k.stop();

~h.play();

(
    ~k[1] = \filter -> {|in| (in * 8).clip2(0.9)};
    ~k[2] = \filter -> {|in| BPeakEQ.ar(in, 400, 1, 12)};
    ~k[3] = \filter -> {|in| (in * 6).fold2(0.8)};
    ~k[4] = \filter -> {|in| BPeakEQ.ar(in, 450, 1, 10)};
    ~k[5] = \filter -> {|in| (in * 3).clip2(1)};

)

(
~k[4] = nil;
)

(
    ~h[1] = \filter -> {|in| CombL.ar(in, 5, 0.02, 3)};
    ~h[2] = \filter -> {|in| GVerb.ar(in, 5)};

)
( 
    ~k[1] = nil;
    ~k[2] = nil;
    ~k[4] = nil;
)