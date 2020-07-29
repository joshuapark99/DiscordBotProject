import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {servers} from "../index";

export default class stop implements IBotCommand {

  private readonly _command = "stop"

  help(): string {
    return "uwu. This command isn't fuwwy impwemented";
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
    servers[msgObject.guild.id].queue = [];
    servers[msgObject.guild.id].dispatcher.end();
  }

}
