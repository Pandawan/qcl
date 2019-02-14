import moment from 'moment';
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

export function isValidDuration(amount: number | string, unit: string) {
  return (
    // Check if first parameter number (amount)
    isNaN(amount as any) ||
    // Check if second parameter is a string (unit)
    typeof unit !== 'string' ||
    // Chck if valid duration
    moment
      .duration(parseInt(amount as any, 10), convertTimes(unit) as any)
      .toISOString() !== 'P0D'
  );
}
