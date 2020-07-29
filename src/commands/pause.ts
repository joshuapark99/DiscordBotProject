import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {servers} from "../index";

export default class pause implements IBotCommand {

  private readonly _command = "pause"

  help(): string {
    return "pause playing of music";
  }
  isThisCommand(command: string): boolean {
    return command === this._command;
  }
  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    if(servers[msgObject.guild.id].dispatcher.paused) {
      msgObject.reply("Music is already paused");
    } else {
      servers[msgObject.guild.id].dispatcher.pause();
      msgObject.reply("Music is now paused");
    }
  }

}
