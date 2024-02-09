// Snippets collection

// source : https://github.com/theseanco/co34pt_LiveCode/tree/master

(

//generic drum patterns
DDWSnippets.put("kick", "~k = Pbind(\\instrument,\\bplay,\\buf,d[\"k\"][0],\\dur,##1##,\\amp,1);");
DDWSnippets.put("hat","~h = Pbind(\\instrument,\\bplay,\\buf,d[\"ch\"][0],\\dur,##0.25##,\\amp,Pexprand(0.05,1));");
DDWSnippets.put("snare","~sn = Pbind(\\instrument,\\bplay,\\buf,d[\"s\"][0],\\dur,##2##,\\amp,1);");
DDWSnippets.put("clap","~c = Pbind(\\instrument,\\bplay,\\buf,d[\"c\"][0],\\dur,##0.75##,\\amp,1);");
DDWSnippets.put("oh","~oh = Pbind(\\instrument,\\bplay,\\buf,d[\"oh\"][1],\\dur,##Pseq([0.5,Pseq([1],inf)],inf)##,\\amp,1);");
DDWSnippets.put("backforth","~sn = Pbind(\\instrument,\\vplay,\\buf,d[\"s\"][0],\\dur,Pbjorklund2(Pwhite(1,6),16)/4,\\amp,1,\\rate,Prand([-1,1],inf),\\pos,Pkey(\\rate).linlin(-1,1,0.99,0));");

//rave drums
DDWSnippets.put("ravedrums","(
~kbk = Pbind(\\instrument,\\bplay,\\buf,Prand(d[\"breaks175\"],inf),\\dur,16,\\amp,1);
~kbk2 = Pbind(\\instrument,\\bplay,\\buf,Prand(d[\"breaks175\"],inf),\\dur,16,\\amp,1);
)");

//rave piano
DDWSnippets.put("ravepiano","(
~piano1 = Pbind(\\instrument,\\bplay,\\buf,d[\"piano\"][1],\\dur,16,\\amp,1);
~piano2 = Pbind(\\instrument,\\bplay,\\buf,d[\"piano\"][1],\\dur,32,\\amp,1,\\rate,0.5);
)");

//quarter note Piano Chop
DDWSnippets.put("pianochop","~pianoChop = Pbind(\\instrument,\\vplay,\\buf,d[\"piano\"][1],\\dur,0.25,\\atk,0,\\sus,0.04,\\rel,0,\\pos,Pexprand(0.2,0.5),\\amp,1,\\rate,2)");

//Rave piano stabs
DDWSnippets.put("pianostab","~ravestab2 = Pbind(\\instrument,\\bplay,\\buf,d[\"stab\"][2],\\dur,Pbjorklund2(3,8)/4,\\rate,Pseq([50,52,55,57].midicps/120,inf).stutter(6),\\amp,1)");

//strings
DDWSnippets.put("strings","~strings = Pbind(\\instrument,\\bplay,\\buf,d[\"strings\"][0],\\dur,10,\\rate,3,\\amp,2)");

// "Snippets successfully loaded!".postln;
// create hot-key to retrieve snippets
// DDWSnippets.learn;
)