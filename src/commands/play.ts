import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as YTDL from "ytdl-core";
import {servers} from "../index"

// The main part that plays the youtube video after downloading with YTDL library

function Play(connection:Discord.VoiceConnection, msgObject: Discord.Message) {
  var server:{ queue?: string[], dispatcher?: Discord.StreamDispatcher} = servers[msgObject.guild.id];
  server.dispatcher = connection.play(YTDL(server.queue[0], {filter: "audioonly"}));

}

export default class play implements IBotCommand {

  private readonly _command = "play"

  help(): string {
    return "Plays music when a link is sent, if something is already playing, put in queue";
  }
  isThisCommand(command: string): boolean {
    return command === this._command;
  }
  async runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): Promise<void> {
    // if person who sent message is in a voice channel
    if(msgObject.member.voice.channel) {
      // if an entry for the server that the message was sent from is not present in the servers list
      if(!servers[msgObject.guild.id]) {
        // if the server does not exist yet in server list, put it in list and initialize the queue to be an empty string
        servers[msgObject.guild.id] = {queue: []};
      }
        // Once all that is done, bot joins a voice channel and passes the arguments (which is the youtube url) to server queue
        const connection = msgObject.member.voice.channel.join();
        servers[msgObject.guild.id].queue.push(args[0])

        // call function to download video from the queue
        Play(await connection,msgObject);
    }
    else {
      msgObject.reply("You must be in a voice channel");
    }
  }

}
