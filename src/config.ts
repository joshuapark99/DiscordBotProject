import * as dotenv from 'dotenv';

dotenv.config({path: '../.env'});

export let config = {
  "token": process.env.TOKEN,
  "prefix": "?",
  "commands": [
    "testCommand",
    "add",
    "queue",
    "loop",
    "pause",
    "resume",
    "skip",
    "amifunny",
    "reset"
  ]
}
