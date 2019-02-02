import { DurationInputArg2 } from 'moment';
export interface IPackage {
    /**
     * Name of the package installed
     */
    name: string;
    /**
     * Date of installation in ISO 8601 format
     */
    installed: string;
    /**
     * Name of the file in the /pkg folder
     */
    file: string;
}
export interface IData {
    packages: IPackage[];
    /**
     * How long should a package be preserved
     * Format: [number, 'unit']
     */
    preservation_time: [number, DurationInputArg2];
}
