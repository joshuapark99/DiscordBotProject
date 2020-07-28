import * as Discord from "discord.js";
import * as ConfigFile from "./config";
import { IBotCommand } from "./api";


const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];


// Basically a datatype to hold a pseudo JSON object
/*
servers = {
  __anIDNumber__ : {     // ID number is the id number of a specific server
    queue: [],           // Will hold all the url's of youtube videos to play
    dispatcher: Discord.StreamDispatcher
  }
}




*/
interface serverList {
  [index:string]: { queue?: string[], dispatcher?: Discord.StreamDispatcher;}
}

// Make it so that servers is kind of like a global variable that I can access in play.ts

export let servers = {} as serverList;


loadCommands(`${__dirname}/commands`)

client.on("ready", () => {
  // Let the us know when the bot is online
  console.log("Ready to go!");
})

client.on("message", msg => {
  //Ignore the message if sent by bot
  if(msg.author.bot) {
    return;
  }
  //Ignore messages that don't start with prefix
  if(!msg.content.startsWith(ConfigFile.config.prefix)) {
    return;
  }

  //Handle the command
  handleCommand(msg);
})

async function handleCommand(msg: Discord.Message) {

  //Split the string into the command an dall of the args
  let command = msg.content.split(" ")[0].replace(ConfigFile.config.prefix, "");
  let args = msg.content.split(" ").slice(1);

  //Loop through all of our loaded commands
  for(const commandClass of commands) {

    //Attempt to execute code but ready in case of error
    try {

      //Check if our command class is the correct one
      if(!commandClass.isThisCommand(command)){

        //Go to the next ieration of  the loop if this isn't the correct command class
        continue;
      }

      //Pause execution whilst we run the command's code
      await commandClass.runCommand(args, msg, client);
    }
    catch(exception) {
      //If there is an error, then log the exception
      console.log(exception);
    }
  }
}

function loadCommands(commandsPath: string) {
  // Exit if there are no commands
  if(!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0){return;}

  //Loop through all commands in our config ConfigFile
  for(const commandName of ConfigFile.config.commands as string[]) {
    const commandsClass = require(`${commandsPath}/${commandName}`).default;

    const command = new commandsClass() as IBotCommand;

    commands.push(command);
  }
}

client.login(ConfigFile.config.token);
