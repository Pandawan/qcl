import { IData, PackageManager } from './interfaces';
/**
 * Set a single key/value pair
 * @param key The key to set
 * @param value The value to set
 */
export declare function setSingleData(key: string, value: any): void;
/**
 * Get the data from the data file (and silent-upgrade it)
 */
export declare function getData(): IData;
/**
 * Create a default data object
 */
export declare function defaultData(): IData;
export declare function getPackageManager(): Promise<PackageManager>;
