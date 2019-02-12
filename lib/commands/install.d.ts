import { Expiry } from '../universal/interfaces';
/**
 * Installs the given package
 * @param pkgName The package to install
 */
export default function install(pkgName: string, expiry: Expiry | undefined): Promise<void>;
