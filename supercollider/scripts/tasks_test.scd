(
~k[0] = Pbind(
    \instrument,\vplay,
    \buf,d["k"][0],
    \dur,1,
    \amp,1
);
)

~k.play();
~k.stop();

(
~bpfsaw.play; ~bpfsaw.awake_(false);
~bpfsaw = {
    var sig, env;
    env = EnvGen.kr(Env([0,1,1,0],[\atk.kr(2),\sus.kr(0),\rel.kr(3)],[\c1.kr(1),0,\c2.kr(-1)]),timeScale:\ts.kr(1),doneAction:2);
    sig = Saw.ar(\freq.kr(500)*{LFNoise1.kr(0.5,\detune.kr(0.02)).midiratio}!2);
    sig = BPF.ar(
        sig,
        {LFNoise1.kr(
            LFNoise1.kr(4).exprange(\cfhzmin.kr(0.1),\cfhzmax.kr(0.3))
        ).exprange(\cfmin.kr(500),\cfmax.kr(2000))}!2,
        {LFNoise1.kr(0.1).exprange(\rqmin.kr(0.1),\rqmax.kr(0.2))}!2
    );
    sig = BLowShelf.ar(sig,\lsf.kr(200),0.5,\ldb.kr(0));
    sig = Balance2.ar(sig[0],sig[1],\pan.kr(0));
    sig = sig*env*\amp.kr(1);
    Out.ar(\out.kr(0),sig);
}
)

~bpfsaw.spawn([\freq, 400, \atk, 3, \sus, 2]);
~bpfsaw.spawn([\freq, 500, \atk, 0.5, \sus, 0.8]);

(
~seq1 = Tdef(\test, {
    loop {
        ~bpfsaw.spawn([\freq, 400, \atk, 2, \sus, 2]); 1.wait;
        2.do(
            {~bpfsaw.spawn([\freq, 500, \atk, 0.5, \sus, 0.8]); 1.wait;}
        );
    }
});
)

~seq1.resume();
~seq1.pause();
~seq1.play(t.clock.tempo);
~seq1.stop();