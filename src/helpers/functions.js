
const newLine = '\n';

export const getUsername = () => {
  const [executer, file, ...rest] = process.argv;
  return rest[0].split('=')[1];
}

export const showCurrentDir = (homedir) => {
  const text = 'You are currently in';
  process.stdout.write(`${text} ${homedir}${newLine}`);
}

export const showStartLine = (username) => {
  const text = 'Welcome to the File Manager,';
  process.stdout.write(`${text} ${username}${newLine}`);
}
