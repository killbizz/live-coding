(
    2+2;
)
(
    a = {SinOsc.ar(440,0,0.1)};        // Descrive un Synth
    a.play;                            // Suona lo strumento
    a.plot;                            // Grafico del segnale
    a.scope;                           // Oscilloscopio
    a.freqscope;                       // Spettroscopio
)
// error
play({SinOsc.ar(LFNoise0.kr(12, mul: 600, add: 1000)),0.1});
// correct
play({SinOsc.ar(LFNoise0.kr(3, mul: 100, add: 300))});

b = {PMOsc.ar(440, MouseY.kr(1, 550), MouseX.kr(1, 15))};
b.play();
b.plot(0.5);

// doesn't work here
Quarks.gui;