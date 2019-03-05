/**
 * Uninstalls the given package
 * @param pkgName The package to uninstall
 */
export declare function run(pkgName: string): Promise<void>;
/**
 * This should only be used internally by the uninstall and cleanup commands.
 */
export declare function uninstallAfterCleanup(pkgName: string): Promise<void>;
