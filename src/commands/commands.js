import path from 'path';
import fs from 'fs/promises';

const failedMsg = 'Operation failed';

export const up = (dir) => {
  try {
    return path.join(dir, '..');
  } catch (error) {
    throw new Error(failedMsg);
  }
}

export const ls = async (dir) => {
  try {
    const files = await fs.readdir(dir);
    console.log(files);
  } catch (error) {
    throw new Error(failedMsg);
  }
}

export const cd = async (dir, nextDir) => {
  try {
    let exist = false
    let correctPath = '';

    if (path.isAbsolute(nextDir)) {
      exist = await checkFileOrDir(nextDir);
      correctPath = nextDir;

    } else {
      const pathTo = path.join(dir, nextDir)
      exist = await checkFileOrDir(pathTo);
      correctPath = pathTo;
    }

    if (!exist) {
      console.log(failedMsg);
      return dir;
    }

    return correctPath;
  } catch (error) {
    console.log(failedMsg);
    return dir;
  }
}

const checkFileOrDir = async (path) => {
  try {
    const isExist = await fs.stat(path);
    return isExist.isFile() ? false : true;
  } catch (error) {
    return false;
  }
}
