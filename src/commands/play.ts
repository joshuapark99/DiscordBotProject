import * as Discord from "discord.js";
import { IBotCommand } from "../api";
import * as YTDL from "ytdl-core-discord";
import { servers, looping, changeLoop } from "../index"

// The main part that plays the youtube video after downloading with YTDL library



async function Play(connection: Discord.VoiceConnection, msgObject: Discord.Message) {
  var server: { queue?: string[], dispatcher?: Discord.StreamDispatcher } = servers[msgObject.guild.id];
  try {
    // let stream = YTDL(server.queue[0], { filter: "audioonly" });
    // stream.on("error", e => {
    //   console.error(e);
    // })
    // server.dispatcher = connection.play(stream);
    server.dispatcher = connection.play(await YTDL(server.queue[0], {filter:'audioonly',quality:'highest', highWaterMark:1<<25}), {type: 'opus'});
    console.log(msgObject.guild.voice);
  }
  catch (error) {
    //msgObject.reply("That isn't a working Youtube link");
    if(!servers[msgObject.guild.id].queue[0]) {
      connection.disconnect();

    }
  }

  // shift() will move all to the left in array indices
  var endSong: string = server.queue.shift();
  if (looping) {
    server.queue.push(endSong);
  }
  server.dispatcher.on("error", (e) => {
    console.log(e);
    if (server.queue[0]) {
      Play(connection, msgObject);
    } else {
      connection.disconnect();

    }

  });
  server.dispatcher.on("finish", () => {
    msgObject.channel.send("Finished playing song");
    if (server.queue[0]) {
      Play(connection, msgObject);
    } else {
      
      connection.disconnect();

    }
  })
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
    if (msgObject.member.voice.channel) {
      console.log("1")
      // Check if bot is already in a voice connection

      if (!msgObject.guild.voice || msgObject.guild.voice.channelID == null) {
        console.log("2")
        // if an entry for the server that the message was sent from is not present in the servers list
        if (!servers[msgObject.guild.id]) {
          console.log("3")
          // if the server does not exist yet in server list, put it in list and initialize the queue to be an empty string
          servers[msgObject.guild.id] = { queue: [] };
        }
        // Once all that is done, bot joins a voice channel and passes the arguments (which is the youtube url) to server queue

        if (args[0]) { //used to check if theres a link
          console.log("4")
          const connection = msgObject.member.voice.channel.join();

          // functionality to choose whether to add to beginning or end
          if (args[1] && args[1] == "1") {
            servers[msgObject.guild.id].queue.unshift(args[0]);
          } else {
            servers[msgObject.guild.id].queue.push(args[0]);
          }


          console.log("5")
          // call function to download video from the queue
          Play(await connection, msgObject);
        } else {
          msgObject.reply("You didn't give me a link");
        }
      }
      else {
        if (!servers[msgObject.guild.id].dispatcher.paused) {
          if (args[0]) {
            if (args[1] && args[1] == "1") {
              servers[msgObject.guild.id].queue.unshift(args[0]);
            } else {
              servers[msgObject.guild.id].queue.push(args[0]);
            }
            msgObject.reply("Added a song to queue");
          }
        } else {
          servers[msgObject.guild.id].dispatcher.resume()
          if (args[0]) {
            if (args[1] && args[1] == "1") {
              servers[msgObject.guild.id].queue.unshift(args[0]);
            } else {
              servers[msgObject.guild.id].queue.push(args[0]);
            }
            msgObject.reply("Added a song to queue");
          }
        }
      }
    }
    else {
      msgObject.reply("You must be in a voice channel");
    }
  }

}
