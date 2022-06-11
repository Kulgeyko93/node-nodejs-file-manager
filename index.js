import os from "os";
import readline from "readline";

import {COMMANDS} from './src/helpers/constants.js';

import {getUsername, showCurrentDir, showStartLine} from './src/helpers/functions.js';
import {up, ls, cd} from './src/commands/commands.js';
import {cat} from './src/operations/operations.js';
import {os_eol, os_cpus, os_homedir, os_username, os_arch} from './src/os/os.js';
import {calculateHash} from './src/hash/hash.js';

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

    if (command.slice(0, 3).toLowerCase()  === COMMANDS.CAT) {
      const pathToFile = command.split(' ')[1];
      await cat(dir, pathToFile, showCurrentDir);

      setTimeout(() => {
        console.log('\n');
        showCurrentDir(dir);
      }, 100);
    }

    if (command === COMMANDS.OS_EOL) {
      await os_eol();
      showCurrentDir(dir);
    }

    if (command === COMMANDS.OS_CPUS) {
      await os_cpus();
      showCurrentDir(dir);
    }

    if (command === COMMANDS.OS_HOMEDIR) {
      await os_homedir();
      showCurrentDir(dir);
    }

    if (command === COMMANDS.OS_username) {
      await os_username();
      showCurrentDir(dir);
    }

    if (command === COMMANDS.OS_ARCH) {
      await os_arch();
      showCurrentDir(dir);
    }

    if (command.slice(0, 4) === COMMANDS.HASH) {
      const file = command.split(' ')[1];
      await calculateHash(dir, file);
      showCurrentDir(dir);
    }
    
    if (command === '.exit') {
      console.log(`Thank you for using File Manager, ${username}!`);
      realdineInterface.pause()
    }
  });

  realdineInterface.on('close', ()=>{
    console.log(`Thank you for using File Manager, ${username}!`);
  })
}

startFileManager();
