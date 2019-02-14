import { IData, PackageManager } from './interfaces';
/**
 * Save the given data to the /qcl/data.json file
 */
export declare function setData(data: IData): void;
/**
 * Set a single key/value pair
 * @param key The key to set
 * @param value The value to set
 */
export declare function setSingleData(key: string, value: string): void;
/**
 * Get the data from the /qcl/data.json file (and silent-upgrade it)
 */
export declare function getData(): Promise<IData>;
/**
 * Create a default data object
 */
export declare function defaultData(): IData;
export declare function getPackageManager(): Promise<PackageManager>;
