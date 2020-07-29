import * as Discord from "discord.js";
import {IBotCommand} from "../api";
import {looping, changeLoop} from "../index";

export default class loop implements IBotCommand {

  private readonly _command = "loop"

  help(): string {
    return "Changes the looping value for playlists";
  }
  isThisCommand(command: string): boolean {
    return command === this._command;
  }
  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    if(looping == false) {
      changeLoop(true);
      msgObject.reply("We are now looping through the playlist");
    } else {
      changeLoop(false);
      msgObject.reply("No looping")
    }
  }

}
