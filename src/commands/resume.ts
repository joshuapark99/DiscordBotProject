import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {servers} from "../index";

export default class resume implements IBotCommand {

  private readonly _command = "resume"

  help(): string {
    return "pause playing of music";
  }
  isThisCommand(command: string): boolean {
    return command === this._command;
  }
  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    if(!servers[msgObject.guild.id].dispatcher.paused) {
      msgObject.reply("Music is already playing");
    } else {
      servers[msgObject.guild.id].dispatcher.resume();
      msgObject.reply("Music is now playing");
    }
  }

}
