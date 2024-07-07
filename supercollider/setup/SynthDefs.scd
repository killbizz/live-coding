// SynthDefs collection

// source : https://github.com/theseanco/co34pt_LiveCode/tree/master

(

/*

vplaym: enveloped mono buffer player
For mono buffers only

Arguments:

out = Channel out
buf = Buffer index
rate = Speed of playback
amp = volume
pan = pan (stereo)
atk = attack
rel = release
pos = position to start playback from 0 to 1

*/
SynthDef(\vplaym, {
	arg out = 0, buf = 0, rate = 1, amp = 0.5, pan = 0, atk=0.01, rel=1, pos=0;
	var sig, env;
	sig = Pan2.ar(PlayBuf.ar(1,buf,BufRateScale.ir(buf) * rate,1,BufDur.kr(buf)*pos*44100,doneAction:2),pan);
	env = EnvGen.ar(Env.linen(0.0,rel,0.0,1));
	sig = sig * env;
	sig = sig * amp;
	Out.ar(out,sig);
}).add;

/*

vplay: enveloped stereo buffer player
For stereo buffers only
The default is to have no attack, as I use this to create a 'chopped-up' effect

Arguments:

out = Channel out
buf = Buffer index
rate = Speed of playback
amp = volume
pan = pan (stereo)
atk = attack
sus = sustain
rel = release
pos = position to start playback from 0 to 1

*/
SynthDef(\vplay, {
	arg out = 0, buf = 0, rate = 1, amp = 0.5, pan = 0, atk=0.0, sus=1, rel= 0, pos=0;
	var sig, env;
	sig = Pan2.ar(PlayBuf.ar(2,buf,BufRateScale.ir(buf) * rate,1,BufDur.kr(buf)*pos*44100,doneAction:2),pan);
	env = EnvGen.ar(Env.linen(atk,sus,rel,1),doneAction:2);
	sig = sig * env;
	sig = sig * amp;
	Out.ar(out,sig);
}).add;

/*

bplay: basic stereo buffer player
This is the bread and butter of my SynthDef library
Designed for simple repeated playback of stereo buffers inside of a pattern
TODO: This - Stereo samples are currently mixed down to mono and positioned in a stereo field by using the Pan2 Ugen. I'm going to correct this soon

out = channel out
buf = buffer index
rate = rate of playback (or pitch)
amp = volume
pan = stereo panning of sample
pos = position of playback (usually not used)
rel = release (usually not used, this is only really in case I accidentally play a sample backwards, and need the synth to free at some point in the future, or schedule very long samples to be played. This is a security measure in case I box my processor.)

*/

SynthDef(\bplay, {
	arg out = 0, buf = 0, rate = 1, amp = 0.5, pan = 0, pos = 0, rel = 15;
	var sig,env ;
	sig = Mix.ar(PlayBuf.ar(2,buf,BufRateScale.ir(buf) * rate,1,BufDur.kr(buf)*pos*44100,doneAction:2));
	env = EnvGen.ar(Env.linen(0.0,rel,0),doneAction:2);
	sig = sig * env;
	sig = sig * amp;
	Out.ar(out,Pan2.ar(sig,pan));
}).add;

/*

bpfsaw: an instrument by Eli Fieldsteel as part of his SuperCollider tutorial series
A detuned slow-enveloped saw wave which sounds lush and beautiful, especially with some extended chords
Has a lot of arguments,

atk = attack
sus = sustain
rel = release
ts = timescale of the envelope
c1 = start of envelope curve
c2 = end of envelope curve
freq = frequency
detune = detuning (multiple of frequency), works well with low values, higher ones get quite silly
pan = panning in stereo
cfhzmin = minimum modulation of filter frequency
cfhzmax = maximum modulation of filter frequency
cfmin = minimum filter frequency
cfmax = maximum filter frequency
rqmin = controls filter sweeping. Lower values = greater effects of filtering
rqmax = controls filter sweeping. Lower values = greater effects of filtering
lsf = frequency at which low shelf is activated
ldb = low shelf boost (in dB) - gets really glitchy over around 16 dB, but sounds great so I keep it high
amp = volume
out = channels out

*/
SynthDef(\bpfsaw, {
	arg atk=2, sus=0, rel=3, ts=1, c1=1, c2=(-1), freq=500, detune=0.02, pan=0, cfhzmin=0.1, cfhzmax=0.3, cfmin=500, cfmax=2000, rqmin=0.1, rqmax=0.2, lsf=200, ldb=0, amp=1, out=0;
	var sig, env;
	env = EnvGen.kr(Env([0,1,1,0],[atk,sus,rel],[c1,0,c2]),timeScale:ts,doneAction:2);
	sig = Saw.ar(freq*{LFNoise1.kr(0.5,detune).midiratio}!2);
	sig = BPF.ar(
		sig,
		{LFNoise1.kr(
			LFNoise1.kr(4).exprange(cfhzmin,cfhzmax)
		).exprange(cfmin,cfmax)}!2,
		{LFNoise1.kr(0.1).exprange(rqmin,rqmax)}!2
	);
	sig = BLowShelf.ar(sig,lsf,0.5,ldb);
	sig = Balance2.ar(sig[0],sig[1],pan);
	sig = sig*env*amp;
	Out.ar(out,sig);
}).add;

"SynthDefs successfully loaded!".postln;
)