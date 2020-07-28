import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import * as YTDL from "ytdl-core";
import {servers} from "../index"

function Play(connection:Promise<Discord.VoiceConnection>, msgObject: Discord.Message) {

}

export default class play implements IBotCommand {

  private readonly _command = "play"

  help(): string {
    return "Plays music when a link is sent, if something is already playing, put in queue";
  }
  isThisCommand(command: string): boolean {
    return command === this._command;
  }
  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    //Let us know it all went well
    if(msgObject.member.voice.channel) {
      if(!servers[msgObject.guild.id]) {
        servers[msgObject.guild.id] = [];
      }
        const connection = msgObject.member.voice.channel.join();
        Play(connection,msgObject);
    }
    else {
      msgObject.reply("You must be in a voice channel");
    }
  }

}
