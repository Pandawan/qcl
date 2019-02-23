import { Expiry } from '../universal/interfaces';
/**
 * Installs the given package
 * @param pkgName The package to install
 */
export declare function run(pkgName: string, expiry: Expiry | undefined): Promise<void>;
