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
     channels: ['girlazo','serpientemimosa'] //'girlazo','serpientemimosa'
});


client.connect();

client.on('message', (channel, tags, message, self) => {
     if (self) return;


     for (let i = 0; i < commands.channels.length; i++) {
          if (channel == `#${commands.channels[i].channel}`) {
               for (let j = 0; j < commands.channels[i].chatCommands.length; j++) {
                    if (message.toLowerCase() === commands.channels[i].chatCommands[j].trigger) {
                         client.say(channel, commands.channels[i].chatCommands[j].value);
                    }
               }
          }
     }
});

setInterval(() => {
     let now = new Date()
     let minute = now.getMinutes();

     for(let i = 0 ; i < commands.channels.length; i++){
          for(let j = 0 ; j < commands.channels[i].periodicCommands.length ; j++){
               if (minute == commands.channels[i].periodicCommands[j].tirggerAtMinute){
                    client.say(`#${commands.channels[i].channel}`, commands.channels[i].periodicCommands[j].value)
               }
          }
     }

}, 60000);




