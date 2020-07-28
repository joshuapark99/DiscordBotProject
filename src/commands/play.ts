import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as YTDL from "ytdl-core";
import {servers} from "../index"

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
    //Let us know it all went well
    if(msgObject.member.voice.channel) {
      if(!servers[msgObject.guild.id]) {
        servers[msgObject.guild.id] = {queue: []};
      }
        const connection = msgObject.member.voice.channel.join();
        servers[msgObject.guild.id].queue.push(args[0])
        Play(await connection,msgObject);
    }
    else {
      msgObject.reply("You must be in a voice channel");
    }
  }

}
