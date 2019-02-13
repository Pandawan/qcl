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

/**
 * Converts the given Time Unit to an appropriate one for moment.js
 * @param unit The unit to convert
 */
export function convertTimes(unit: string) {
  switch (unit) {
    case 'min':
      return 'minute';
    case 'mins':
      return 'minutes';
    default:
      return unit;
  }
}
