/**
 * Execute the command using node-cmd in an ASYNC function
 * @param command The command to run
 */
export declare function getAsync(command: string): Promise<{}>;
/**
 * Converts the given Time Unit to an appropriate one for moment.js
 * @param unit The unit to convert
 */
export declare function convertTimes(unit: string): string;
