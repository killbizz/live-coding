// bpm = 128; hydra.synth.time = 0;

a.setBins(2);
a.setCutoff(10.5);
a.setScale(2);
a.setSmooth(0.65);

s0.initImage('local/files/images/elena_culona_5.jpg');

src(s0)
.out(o0);