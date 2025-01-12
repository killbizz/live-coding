(
~sn = Pbind(\instrument,\bplay,\buf,d["s"][0],\dur,Pwhite(1,5.0).round(1),\amp,0.5);
// ~h = Pbind(\instrument,\bplay,\buf,d["ch"][0],\dur,Pwhite(0.25,0.75).round(0.25),\amp,Pwhite(0.2,1));
~c = Pbind(\instrument,\bplay,\buf,d["c"][0],\dur,Pwhite(0.75,2).round(0.75),\amp,0.5);
~t = Pbind(\instrument,\bplay,\buf,d["t"][0],\dur,Pwhite(1,5.0).round(0.5),\amp,0.5);
~sn.play;~h.play;~c.play;~t.play;
)

~sn.stop;~h.stop;~c.stop;~t.stop;

(
~k[0] = Pbind(
    \instrument,\bplay,
    \buf,d["k"][0],
    \dur,Pseq([
        Pseq([1,1,1,1]),
        Pseq([1,1,1,1])
        ],inf),
    \amp,1
);
)

~k.fadeTime()
~p = [1,2,3,4,5];
d.postln();

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



~k.inspect();
~k.monitor.fadeTime();
~k.fadeTime();

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
        ~k.play();
        // wait(1);
		d[\sync].value("color = 0;");
		1.wait;
		d[\sync].value("color = 2");
		// ~k.stop();
		1.wait;
    }
});
// ~seq1.fadeTime = 0;
)

~seq1.resume();
~seq1.pause();