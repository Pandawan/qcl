interface IQCLPackage {
    /**
     * Name of the package installed
     */
    name: string;
    /**
     * Id of the package installed
     * (most likely a path-compatible snake_case version of the name).
     */
    id: string;
    /**
     * Date of installation in ISO 8601 format
     */
    installed: string;
}
/**
 * Runs basic qcl tasks and cleanup
 * @param debug Whether or not to log status (default true)
 */
declare function cleanup(debug?: boolean): Promise<void>;
/**
 * Installs the given package
 * @param pkg The package to install
 * @param debug Whether or not to log status (default true)
 */
declare function install(pkg: string, debug?: boolean): Promise<void>;
/**
 * Uninstalls the given package
 * @param pkg The package to uninstall
 * @param debug Whether or not to log status (default true)
 */
declare function uninstall(pkg: string, debug?: boolean): Promise<void>;
/**
 * List all packages installed
 * @param debug Whether or not to log status (default true)
 */
declare function list(debug?: boolean): Promise<IQCLPackage[]>;
declare const _default: {
    install: typeof install;
    uninstall: typeof uninstall;
    cleanup: typeof cleanup;
    list: typeof list;
};
export default _default;
