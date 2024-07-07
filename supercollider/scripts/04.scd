Server.killAll();
p.postln();

(
    ~lfo = {SinOsc.kr(1).exprange(0.1, 0.8)};
    ~lfo2 = {SinOsc.kr(2).exprange(100, 200)};
)

(
    ~a.play.fadeTime_(3);
    ~a = {
        var sig;
        sig = SinOsc.ar(~lfo2 ,0,~lfo.kr(1));
        Splay.ar(sig);
    };
    ~a[1] = \filter -> {|in| (in * 8).softclip};
)
~a[1] = nil;

(
    ~dist.play.fadeTime_(3);
    ~dist = {
        var sig;
        sig = (~a*8).softclip;
        Splay.ar(sig);
    }
)
~dist.clear();
