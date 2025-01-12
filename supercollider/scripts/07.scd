s.plotTree;

(
var synth;
MIDIdef.noteOn(\midiNoteOn, { |vel, num, chan, src|
    // Create a Synth when a MIDI note is received
    synth = Synth(\default, [\freq, num.midicps, \amp, vel / 127]);
});

MIDIdef.noteOff(\midiNoteOff, { |vel, num, chan, src|
    // Free the Synth when the note is released
    synth.release;
});
)

// Create a simple default SynthDef to play a sound
(
SynthDef(\default, { |freq = 440, amp = 0.1, gate = 1|
    var env = EnvGen.kr(Env.asr(0.01, 1, 0.1), gate, doneAction: 2);
    var sig = SinOsc.ar(freq) * env * amp;
    Out.ar(0, sig ! 2);  // Stereo output
}).add;
)

orcaPattern = " .8C4.....
                D804TCAFE
                .:03C....";