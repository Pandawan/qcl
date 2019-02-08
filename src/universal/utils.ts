import cmd from 'node-cmd';

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
