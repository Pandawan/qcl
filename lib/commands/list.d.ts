import { IPackage, PreservationTime } from '../universal/interfaces';
export declare type ListArgs = 'expires' | undefined;
/**
 * List all packages installed
 */
export default function list(args: ListArgs[]): Promise<IPackage[]>;
/**
 * Get when the package with the given install date will expire (in units)
 * @param installedDate The time at which the package was installed
 */
export declare function expireTime(installedDate: string, preservationTime: PreservationTime): Promise<string>;
