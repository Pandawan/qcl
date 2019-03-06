import { Expiry } from './interfaces';
/**
 * Execute the command using node-cmd in an ASYNC function, using the current stdio.
 * @param command The command to run
 */
export declare function getAsync(command: string): Promise<{}>;
/**
 * Converts the given Time Unit to an appropriate one for moment.js
 * @param unit The unit to convert
 */
export declare function convertTimes(unit: string): string;
export declare function isValidDuration(amount: number | string, unit: string): boolean;
/**
 * Parses the given string "5hours" into an expiry object [5, "hours"]
 * @param value The value to parse
 */
export declare function parseDuration(value: string): Expiry;
