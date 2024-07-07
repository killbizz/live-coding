// source : https://github.com/theseanco/co34pt_LiveCode/tree/master

// WARNING
// - thisProcess.nowExecutingPath IS NULL
// - loadRelative method not working => use "absoulte-path".load()
// - Quarks must be moved from the 'downloaded-quarks' to the 'Extensions' folder
// - Proxy setup can't be done loading a file

(

// Server.killAll();
Buffer.freeAll();
Tdef.removeAll();
ServerTree.removeAll();
StageLimiter.deactivate;

//increase number of buffers the server has access to for loading samples
s.options.numBuffers = 1024 * 16;
//increase the memory available to the server
s.options.memSize = 8192 * 64;
//boot the server, wait until it has booted, then execute the following - Thanks Till Bovermann!
s.waitForBoot({
    "Starting server setup".postln;
	//display the oscilloscope
	// s.scope;
	//start proxyspace
	// p = ProxySpace.push(s);
	// s.sync;
	//start tempo clock
	// p.makeTempoClock;
	//give proxyspace a tempo
	// p.clock.tempo = 2;
	//wait for the server to sync
	// s.sync;
	d = Dictionary.new;
	d.add(\foldernames -> PathName("C:/Users/gabri/Desktop/live-coding/supercollider/samples").entries);
	for (0, d[\foldernames].size-1,
		{arg i; d.add(d[\foldernames][i].folderName -> d[\foldernames][i].entries.collect({
			arg sf;
			Buffer.read(s,sf.fullPath);
		});
	)});
	s.sync;
	//proxy setup
    // "C:/Users/gabri/Desktop/live-coding/supercollider/setup/Proxy.scd".load();
	//loads synthdefs from setup folder
	"C:/Users/gabri/Desktop/live-coding/supercollider/setup/SynthDefs.scd".load();
    //loads snippets from setup folder
	//"C:/Users/gabri/Desktop/live-coding/supercollider/setup/Snippets.scd".load();
	//wait, for the server to sync - Thanks Till Bovermann!
	//activate StageLimiter - Part of the BatLib quark
	StageLimiter.activate;
	"Server setup done!".postln;
};
);

)