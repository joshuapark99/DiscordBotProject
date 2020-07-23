import * as Discord from "discord.js";
import {IBotCommand} from "../api";

export default class testCommand implements IBotCommand {

  private readonly _command = "testCommand"

  help(): string {
    return "uwu. This command isn't fuwwy impwemented";
  }
  isThisCommand(command: string): boolean {
    return command === this._command;
  }
  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    //Let us know it all went well!
    msgObject.channel.send("It Worked!");
  }

}
