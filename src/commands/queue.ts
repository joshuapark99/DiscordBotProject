import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {servers} from "../index"

export default class queue implements IBotCommand {

  private readonly _command = "queue"

  help(): string {
    return "Prints the music queue";
  }
  isThisCommand(command: string): boolean {
    return command === this._command;
  }
  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    var server = servers[msgObject.guild.id];
    for(let i = 0; i < server.queue.length; i++) {
      msgObject.reply(server.queue[i]);
    }
  }

}
