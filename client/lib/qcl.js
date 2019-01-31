"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
/**
 * Runs basic qcl tasks and cleanup
 */
function cleanup() {
    console.log('Cleaning up...');
    // TODO: Cleanup packages
}
// TODO: Allow for multiple packages (using spread operator)
/**
 * Installs the given package
 */
function install(pkg) {
    if (!pkg) {
        throw new Error('No package was given');
    }
    console.log(`Installing "${pkg}" in ${getDataPath('packages')}`);
    // TODO: Install packages
}
// TODO: Probably want to store the list of currently installed packages in a file in the /qcl/ folder along with its install date (so it can be removed in 48hours)
/**
 * Uninstalls the given package
 */
function uninstall(pkg) {
    if (!pkg) {
        throw new Error('No package was given');
    }
    console.log(`Uninstalling "${pkg}" in ${getDataPath('packages')}`);
    // TODO: Uninstall packages
}
/**
 * List all packages installed
 */
async function list() {
    try {
        const data = await getData();
        console.log(data.packages && data.packages.length !== 0
            ? data.packages.join(', ')
            : 'No packages installed.');
        return data.packages;
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
    try {
        // If the path exists, read it and return its data
        if (await fs_extra_1.default.pathExists(getDataPath('data'))) {
            // Read the JSON file and return its data
            const data = await fs_extra_1.default.readJson(getDataPath('data'));
            return data;
        }
        else {
            const data = defaultData();
            // Write the default data to the path
            await fs_extra_1.default.writeJSON(getDataPath('data'), data);
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
    return { packages: [] };
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
            throw new Error('Platform not supported!');
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
// TODO: Should getDataPath, getPackagePath, etc. be exported?
exports.default = { install, uninstall, cleanup, list };
