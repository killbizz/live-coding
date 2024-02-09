(
~k[0] = Pbind(
    \instrument,\bplay,
    \buf,d["k"][0],
    \dur,Pseq([1, 1, 1, 0.75, 0.25], inf),
    \amp,0.2
);
)

(
~h[0] = Pbind(
    \instrument,\bplay,
    \buf,d["ch"][0],
    // \dur,Pseq([0.25, 0.5, 0.25],inf),
    \dur,Pseq([0.5, Pseq([1],inf)],inf),
    \amp,Pexprand(0.15,0.25),
    \rate, 1
);
)

~k.play();
~h.play();

~h.pause();
~h.resume();
~h.stop();

d.keys();