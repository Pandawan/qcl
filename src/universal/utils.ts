import cmd from 'node-cmd';

/**
 * Execute the command using node-cmd in an ASYNC function
 * @param command The command to run
 */
export function getAsync(command: string) {
  return new Promise((resolve, reject) => {
    cmd.get(command, (err: Error, data: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
