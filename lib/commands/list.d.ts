import { IPackage } from '../universal/interfaces';
export declare type ListArgs = 'expires' | 'versions' | undefined;
/**
 * List all packages installed
 */
export default function list(args: ListArgs[]): Promise<IPackage[]>;
