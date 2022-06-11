import os from 'os';

export const os_eol = async () => {
  if (os.EOL === '\n') console.log('\\n');
  if (os.EOL === '\r\n') console.log('\\r\\n');
  return;
}

export const os_cpus = async () => {
  console.log(os.cpus());
}

export const os_homedir = async () => {
  console.log(os.homedir());
}

export const os_username = async () => {
  console.log(os.userInfo().username);
}

export const os_arch = async () => {
  console.log(os.arch());
}
