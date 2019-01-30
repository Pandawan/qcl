interface IQCLPackage {
    /**
     * Name of the package installed
     */
    name: string;
    /**
     * Date of installation in ISO 8601 format
     */
    installed: string;
}
/**
 * Runs basic qcl tasks and cleanup
 */
declare function cleanup(): void;
/**
 * Installs the given package
 * @param pkg The package to install
 */
declare function install(pkg: string): void;
/**
 * Uninstalls the given package
 * @param pkg The package to uninstall
 */
declare function uninstall(pkg: string): void;
/**
 * List all packages installed
 */
declare function list(): Promise<IQCLPackage[]>;
declare const _default: {
    install: typeof install;
    uninstall: typeof uninstall;
    cleanup: typeof cleanup;
    list: typeof list;
};
export default _default;
