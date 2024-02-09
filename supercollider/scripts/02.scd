//same example but with all rhythms constrained
(
~sn = Pbind(\instrument,\bplay,\buf,d["s"][0],\dur,Pwhite(1,5.0).round(1),\amp,1);
~h = Pbind(\instrument,\bplay,\buf,d["ch"][0],\dur,Pwhite(0.25,0.75).round(0.25),\amp,Pwhite(0.2,1));
~c = Pbind(\instrument,\bplay,\buf,d["c"][0],\dur,Pwhite(0.75,2).round(0.75),\amp,1);
~t = Pbind(\instrument,\bplay,\buf,d["t"][0],\dur,Pwhite(1,5.0).round(0.5),\amp,1);
~sn.play;~h.play;~c.play;~t.play;
)
//sounds more palatable with everything arranged properly

(
~k[0] = Pbind(
    \instrument,\bplay,
    \buf,d["k"][0],
    \dur,Pseq([1,1,1,0.75,0.25],inf),
    \amp,1
);
)
~k.play();

s.plotTree();
d.keys();

p.clear();
p;