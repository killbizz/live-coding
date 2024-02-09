(
    p == currentEnvironment;
)

(
    d;
)

s.plotTree;
p.fadeTime();

(
~k[0] = Pbind(
    \instrument,\bplay,
    \buf,d["k"][0],
    \dur,0.5,
    \amp,0.2
);
)

~k.play();
~k.stop();

(
~h[0] = Pbind(
    \instrument,\bplay,
    \buf,d["ch"][0],
    \dur,0.5,
    \amp,Pexprand(0.05,0.3)
);
)
~h.play();
~h.stop();