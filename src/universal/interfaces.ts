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
  // TODO: Add an install path so that it can record where it was install once we add local qcl (rather than global)
}

export interface IData {
  /**
   * Which package manager to use to install packages.
   */
  packageManager: PackageManager;
  /**
   * List of all currently installed packages
   */
  packages: IPackage[];
  /**
   * How long should a package be preserved
   * Format: [number, 'unit']
   */
  preservation_time: [number, DurationInputArg2];
}

export type PackageManager = 'npm' | 'yarn';
