(
~sn = Pbind(\instrument,\bplay,\buf,d["s"][0],\dur,Pwhite(1,5.0).round(1),\amp,0.5);
// ~h = Pbind(\instrument,\bplay,\buf,d["ch"][0],\dur,Pwhite(0.25,0.75).round(0.25),\amp,Pwhite(0.2,1));
~c = Pbind(\instrument,\bplay,\buf,d["c"][0],\dur,Pwhite(0.75,2).round(0.75),\amp,0.5);
~t = Pbind(\instrument,\bplay,\buf,d["t"][0],\dur,Pwhite(1,5.0).round(0.5),\amp,0.5);
~sn.play(fadeTime: 0); ~h.play(fadeTime: 0); ~c.play(fadeTime: 0); ~t.play(fadeTime: 0);
)

~sn.stop;~h.stop;~c.stop;~t.stop;

d.postln();

(
// update it to avoid losing 1 node reference at every code update
p.clock.sched(p.clock.timeToNextBeat,{~k.set(\gate, 0);});
~k[0] = Pbind(
    \instrument,\bplay,
    \buf,d["gab"][0],
    \dur,Pseq([
        Pseq([1,1,1,1]),
        Pseq([1,1,1,0.25, 0.25, 0.5])
        ],inf),
    \amp,0.1
);
)

s.plotTree;
SynthDescLib.global.browse;
s.meter;
s.scope(zoom: 0);
p.postln();
p.quant_(4);
p.quant();

~k.play();
~k.play(fadeTime: 0);
~k.fadeTime();
~k[0].postln();
~k.quant();
~k.monitor.fadeTime();
~k.fadeTime_(0.01).monitor.fadeTime_(0);
~k.vol();
~k.stop();
~k.monitor.postln();

// how can I prevent the overlap del kick modificato con quello precedente modificandone il Pbind source?

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

// debugging why the kick starts with an env ramp
(
p.clock.schedAbs(p.clock.nextBar, {
    "Starting sound".postln;
    ~k.play();
});
)

~k.play();
~k.stop();

~h.play();

// List all available devices
ServerOptions.devices.collect(_.postln);

// -----------------------

// (
// d.add(\visualServer -> NetAddr.new("localhost", 3002));

// d.add(\sync -> { |command|
//     d[\visualServer].sendMsg("/visuals", command);
// });
// )

d[\visualServer].postln;
d[\sync].postln;

d[\sync].value("osc(1000, 0.1, 2).out()");


// -----------------------
// task to test audio-video sync

(
~seq1 = Tdef(\test, {
    loop {
        // ~k.play();
        // wait(1);
		d[\sync].value("osc(100, 0.4, 2).out();");
		3.wait;
		d[\sync].value("osc(10, 0.4, 0).out()");
		// ~k.stop();
		1.wait;
    }
});
)

~seq1.resume();
~seq1.pause();