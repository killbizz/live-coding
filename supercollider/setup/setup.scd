(
    "C:/Users/gabri/Desktop/live-coding/supercollider/setup/Server.scd".load();
)

// to evaluate sequentially
Quarks.install("SuperDirt");
thisProcess.recompile;
SuperDirt.start;

// (
//     "C:/Users/gabri/Desktop/live-coding/supercollider/setup/Proxy.scd".load();
// )