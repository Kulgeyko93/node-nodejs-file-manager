import {readFileSync} from 'fs';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const failedMsg = 'Operation failed';

export const calculateHash = async (dir, file) => {
  try {
    const pathToFile = path.join(dir, file);
    const isExist = checkFile(pathToFile);

    if (!isExist) {
      console.log(failedMsg);
      return;
  }

  const text = readFileSync(pathToFile, "utf8");

  const hash = crypto
      .createHash('sha256')
      .update(text)
      .digest('hex');

  console.log(hash);

  } catch (error) {
    console.log(failedMsg);
    return;
  }
};

async function checkFile(path) {
  try {
      const isExist = await fs.stat(path);
      return isExist.isFile() ? true : false;
  } catch (error) {
      return false;
  }
}
