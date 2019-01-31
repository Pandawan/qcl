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
 */
declare function cleanup(): void;
/**
 * Installs the given package
 */
declare function install(pkg: string): void;
/**
 * Uninstalls the given package
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
