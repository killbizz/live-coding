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

// Routing audio to Reaper through CABLE (use ReaRoute to have more channels)
// s.options.outDevice = "CABLE Input";
// s.options.numOutputBusChannels = 8;
// s.reboot { "Server rebooted with new settings.".postln; };

//increase number of buffers the server has access to for loading samples
s.options.numBuffers = 1024 * 16;
//increase the memory available to the server
s.options.memSize = 8192 * 64;
//boot the server, wait until it has booted, then execute the following - Thanks Till Bovermann!
s.waitForBoot({
    "Starting server setup".postln;
	//display the oscilloscope
	// s.scope;
	// create the Dictionary
	d = Dictionary.new;
	d.add(\foldernames -> PathName("C:/Users/gabri/Desktop/live-coding/supercollider/samples").entries);
	for (0, d[\foldernames].size-1,
		{arg i; d.add(d[\foldernames][i].folderName -> d[\foldernames][i].entries.collect({
			arg sf;
			Buffer.read(s,sf.fullPath);
		});
	)});
	// creates the server to send OSC messages to the visuals
	d.add(\visualServer -> NetAddr.new("localhost", 3002));
	d.add(\sync -> { |command|
		d[\visualServer].sendMsg("/visuals", command);
	});
	s.sync;
	//loads synthdefs from setup folder
	"C:/Users/gabri/Desktop/live-coding/supercollider/setup/SynthDefs.scd".load();
    //loads snippets from setup folder
	//"C:/Users/gabri/Desktop/live-coding/supercollider/setup/Snippets.scd".load();
	//activate StageLimiter - Part of the BatLib quark
	StageLimiter.activate;
	"Server setup done!".postln;
};
);

)