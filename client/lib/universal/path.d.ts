import { IPackage } from './interfaces';
/**
 * Get the path to the main /qcl/ directory.
 */
export declare function getMainPath(): string;
/**
 * Get the path to the directory where all of the packages are installed.
 */
export declare function getPackagePath(): string;
/**
 * Get the path to the given package's binary file
 */
export declare function getPackageFilePath(pkg: IPackage): string;
/**
 * Get the path to the /qcl/data.json file
 */
export declare function getDataPath(): string;
