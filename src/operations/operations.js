import fs from 'fs/promises';
import {createReadStream} from 'fs';
import path from 'path';

const failedMsg = 'Operation failed';

export const cat = async (pathToFile, fileName) => {
    try {
        const fullPath = path.join(pathToFile, fileName);
        const isExist = await checkFile(fullPath);

        if (!isExist) {
            console.log(failedMsg);
            return;
        }

        const stream = await createReadStream(fullPath);
        await stream.pipe(process.stdout);
        return;
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
