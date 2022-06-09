import os from "os";
import readline from "readline";

import {COMMANDS} from './src/helpers/constants.js';

import {getUsername, showCurrentDir, showStartLine} from './src/helpers/functions.js';
import {up, ls, cd} from './src/commands/commands.js';

const failedMsg = 'Operation failed';

let dir = os.homedir();

const username = getUsername()

const startFileManager = () => {
  showStartLine(username);
  showCurrentDir(dir);

  const realdineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  realdineInterface.on('line', async (input) => {
    const command = input.trim();

    if (command.toLowerCase()=== COMMANDS.UP) {
      dir = up(dir);
      showCurrentDir(dir);
    }

    if (command.toLowerCase() === COMMANDS.LS) {
      await ls(dir);
      showCurrentDir(dir);
    }

    if (command.slice(0, 2).toLowerCase() === COMMANDS.CD) {
      const nextDir = command.split(' ')[1] && command.split(' ')[1].trim();
      if (nextDir) {
        dir = await cd(dir, nextDir);
        showCurrentDir(dir);
      } else {
        console.log(failedMsg);
      }
    }
  })
}

startFileManager();
