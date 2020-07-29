import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {servers} from "../index"

export default class skip implements IBotCommand {

  private readonly _command = "skip"

  help(): string {
    return "Skip the song";
  }
  isThisCommand(command: string): boolean {
    return command === this._command;
  }
  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    //Let us know it all went well!
    if(!msgObject.member.voice.channel) {
      msgObject.reply("You need to be in a voice channel");
      return;
    }
    servers[msgObject.guild.id].dispatcher.end();
    msgObject.reply("Song Skipped");
  }

}
