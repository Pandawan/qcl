"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
/**
 * Runs basic qcl tasks and cleanup
 * @param debug Whether or not to log status (default true)
 */
async function cleanup(debug = true) {
    if (debug) {
        console.log('Cleaning up old packages.');
    }
    const data = await getData();
    try {
        const packagesToUninstall = data.packages.filter(pkg => 
        // If the install date + 48 hours < current date, uninstall this package
        moment_1.default(pkg.installed)
            .add(data.preservationTime[0], data.preservationTime[1])
            .isBefore(moment_1.default()));
        // Loop through the list of packages and uninstall them
        for (const pkg of packagesToUninstall) {
            await uninstall(pkg.name, debug);
        }
        if (debug) {
            console.log('Successfully cleaned up packages.');
        }
    }
    catch (error) {
        throw error;
    }
}
// TODO: Allow "debug" as a "--debug" option instead in CLI
// TODO: Allow for multiple packages (using spread operator)
/**
 * Installs the given package
 * @param pkgName The package to install
 * @param debug Whether or not to log status (default true)
 */
async function install(pkgName, debug = true) {
    if (!pkgName) {
        throw new Error('No package was given.');
    }
    if (debug) {
        console.log(`Installing "${pkgName}" in ${getDataPath('packages')}`);
    }
    // TODO: Install packages
}
// TODO: Probably want to store the list of currently installed packages in a file in the /qcl/ folder along with its install date (so it can be removed in 48hours)
/**
 * Uninstalls the given package
 * @param pkgName The package to uninstall
 * @param debug Whether or not to log status (default true)
 */
async function uninstall(pkgName, debug = true) {
    if (!pkgName) {
        throw new Error('No package was given.');
    }
    const data = await getData();
    const index = data.packages.findIndex(p => p.name === pkgName);
    // Check that this package was installed.
    if (index < 0) {
        throw new Error(`Package "${pkgName}" was not installed.`);
    }
    if (debug) {
        console.log(`Uninstalling "${pkgName}" in ${getDataPath('packages')}`);
    }
    const pkg = data.packages[index];
    // Delete the package from file system
    await fs_extra_1.default.remove(getPackagePath(pkg));
    // Filter the packages to remove the package at the given index
    data.packages = data.packages.filter((v, i) => i !== index);
    // Update the data file with changes
    await setData(data);
    if (debug) {
        console.log(`Package "${pkgName}" was successfully uninstalled.`);
    }
}
/**
 * List all packages installed
 * @param debug Whether or not to log status (default true)
 */
async function list(debug = true) {
    try {
        const data = await getData();
        if (debug) {
            console.log(data.packages && data.packages.length !== 0
                ? data.packages.join(', ')
                : 'No packages installed.');
        }
        return data.packages;
    }
    catch (error) {
        // TODO: Better error handling
        throw error;
    }
}
/**
 * Set the qcl data
 * @param data The data to set
 */
async function setData(data) {
    const dataPath = getDataPath('data');
    try {
        // Make sure the entire path exists
        await fs_extra_1.default.ensureFile(dataPath);
        // Write the default data to the path
        await fs_extra_1.default.writeJSON(dataPath, data);
    }
    catch (error) {
        // TODO: Better error handling
        throw error;
    }
}
/**
 * Get the qcl data
 */
async function getData() {
    const dataPath = getDataPath('data');
    try {
        // If the path exists, read it and return its data
        if (await fs_extra_1.default.pathExists(dataPath)) {
            // Read the JSON file and return its data
            const data = await fs_extra_1.default.readJson(dataPath);
            return data;
        }
        else {
            // Set data using defaultData and return it
            const data = defaultData();
            await setData(data);
            return data;
        }
    }
    catch (error) {
        // TODO: Better error handling
        throw error;
    }
}
/**
 * Create a default data object
 */
function defaultData() {
    // TODO: Add a "set" subcommand to allow for modification of settings in CLI
    return { packages: [], preservationTime: [48, 'hours'] };
}
// TODO: Might want to separate this function into three?
/**
 * Get the path to an important section
 * @param type The type of path to access.
 * undefined/directory: path to qcl directory
 * packages: path to the pkg directory
 * data: path to the data file
 */
function getDataPath(type) {
    let dataPath;
    // Different path based on platform
    switch (process.platform) {
        case 'darwin':
        case 'linux':
            dataPath = '/usr/local/lib/qcl/';
            break;
        case 'win32':
            dataPath = `${process.env.APPDATA}/qcl/`;
            break;
        default:
            // TODO: Better platform support
            throw new Error('Platform not supported.');
    }
    // Different path based on requested type
    switch (type) {
        case 'directory':
        case undefined:
            return path_1.default.normalize(dataPath);
        case 'packages':
            return path_1.default.join(dataPath, '/pkg/');
        case 'data':
            return path_1.default.join(dataPath, 'data.json');
        default:
            // TODO: Better error messages
            throw new Error(`Data Path type must be one of ['directory', 'packages', 'data']`);
    }
}
/**
 * Get the directory where a specific package is installed
 */
function getPackagePath(pkg) {
    return path_1.default.join(getDataPath('packages'), pkg.file);
}
// TODO: Should getDataPath, getPackagePath, etc. be exported?
exports.default = { install, uninstall, cleanup, list };
