require('dotenv').config();
const tmi = require('tmi.js');
const commands = require('./db/commands.json');


const client = new tmi.Client({
     options: { debug: true },
     connection: {
          reconnect: true,
          secure: true
     },
     identity: {
          username: 'fasterchatter',
          password: process.env.TOKEN
     },
     channels: ['girlazo']
});


client.connect();

client.on('message', (channel, tags, message, self) => {
     if (self) return;

     for (let i = 0; i < commands.chatCommands.length; i++) {
          if (message.toLowerCase() === commands.chatCommands[i].trigger) {
               client.say(channel, commands.chatCommands[i].value);
          }
     }
});

setInterval(() => {
     let now = new Date()
     let minute = now.getMinutes();

     for(let i = 0 ; i < commands.periodicCommands.length; i ++){
          if(minute == commands.periodicCommands[i].tirggerAtMinute){
               client.say(client.channels[0],commands.periodicCommands[i].value)
          }
     }
}, 60000);


