Server.killAll();
s.plotTree();
s.scope();

p.clear();
p.postln();

(
    ~sineAmp = {SinOsc.kr(1).exprange(0.2, 0.8)};
    ~sineFreq = {SinOsc.kr(2).exprange(100, 200)};
)

(
    ~sine.play;
    ~sine = {
        var sig;
        sig = SinOsc.ar(~sineFreq ,0, ~sineAmp);
        Splay.ar(sig);
    };
    ~sine[1] = \filter -> {|in| (in * 8).softclip};
)
~sine[1] = nil;

(
    ~dist.play.fadeTime_(3);
    ~dist = {
        var sig;
        sig = (~sine*8).softclip;
        Splay.ar(sig);
    }
)
~dist.clear();