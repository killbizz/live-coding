const readline = require('readline');
const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();

// START - local hydra server
app.use(express.static(path.join(__dirname)));
app.get('/', async(req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(8080, () => {
  console.log("hydra local server successfully running on http://localhost:8080");
});
// END - local hydra server

// START - local terminal server
const terminalServer = createServer(app);
const io = new Server(terminalServer, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('terminal server : Client connected');
  socket.on('disconnect', () => {
    console.log('terminal server : Cient disconnected');
  });
});

terminalServer.listen(3000, () => {
  console.log('terminal server running at http://localhost:3000');
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let command = "";

let recursiveAsyncReadLine = function () {
    rl.question('cmd> ', function (hydraCommand) {
        if(hydraCommand == "cls") {
          console.clear();
        } else if(!hydraCommand.startsWith("//")){
          command = command + hydraCommand;
          if(hydraCommand.endsWith(';')) {
            // send command to client
            console.log("\n\n");
            io.sockets.emit('new-command', { data: command});
            command = "";
          }
        }
        recursiveAsyncReadLine();
    });
};

console.clear();
recursiveAsyncReadLine();
// END - local terminal server