import { IPackage, Expiry } from '../universal/interfaces';
/**
 * List all packages installed
 */
export default function list(): Promise<IPackage[]>;
/**
 * Get when the package with the given install date will expire (in units)
 * @param installedDate The time at which the package was installed
 */
export declare function expireTime(installedDate: string, preservationTime: Expiry): Promise<string>;
