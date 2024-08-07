(
~sn = Pbind(\instrument,\bplay,\buf,d["s"][0],\dur,Pwhite(1,5.0).round(1),\amp,0.5);
// ~h = Pbind(\instrument,\bplay,\buf,d["ch"][0],\dur,Pwhite(0.25,0.75).round(0.25),\amp,Pwhite(0.2,1));
~c = Pbind(\instrument,\bplay,\buf,d["c"][0],\dur,Pwhite(0.75,2).round(0.75),\amp,0.5);
~t = Pbind(\instrument,\bplay,\buf,d["t"][0],\dur,Pwhite(1,5.0).round(0.5),\amp,0.5);
~sn.play;~h.play;~c.play;~t.play;
)
~c.stop();
(
    { SinOsc.ar(300, 0, 1.2).wrap2(1.1) }.scope(1);
)

(
{
    var in;
    in = SinOsc.ar(300, 0, MouseX.kr(0.1,8pi,1));
    SinOsc.ar(0, in, 0.2); // 0 Hz sine oscillator
}.scope(1);
)

(
~k[0] = Pbind(
    \instrument,\bplay,
    \buf,d["k"][0],
    \dur,Pseq([1,1,1,0.75,0.25],inf),
    \amp,1
);
)

(
~h[0] = Pbind(
    \instrument,\bplay,
    \buf,d["ch"][0],
    \dur,Pseq([0.5,Pseq([1],inf)],inf),
    \amp,Pexprand(0.3,0.5)
);
)

~k.play();
~k.stop();
~h.play();
~h.stop();

(
    ~k[1] = \filter -> {|in| (in * 8).fold2(1)};
    ~k[2] = \filter -> {|in| LPF.ar(in, MouseY.kr(25, 18000, 1), 0.5)};
    ~k[3] = \filter -> {|in| (in * 12).fold2(0.4)};
)

(
    ~h[1] = \filter -> {|in| CombL.ar(in, 5, 0.02, 3)};
    ~h[2] = \filter -> {|in| GVerb.ar(in, 5)};

)
~h[2] = nil;
( 
    ~k[1] = nil;
    ~k[2] = nil;
    ~k[4] = nil;
)

~k.play();
~k.stop();

s.plotTree();
d.keys();

p.clear();
p;