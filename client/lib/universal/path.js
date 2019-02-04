"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
/**
 * Get the path to the main /qcl/ directory.
 */
function getMainPath() {
    // Different path based on platform
    switch (process.platform) {
        case 'darwin':
        case 'linux':
            return '/usr/local/lib/qcl/';
        case 'win32':
            return `${process.env.APPDATA}/qcl/`;
        default:
            // TODO: Better platform support
            throw new Error('Platform not supported.');
    }
}
exports.getMainPath = getMainPath;
/**
 * Get the path to the directory where all of the packages are installed.
 */
function getPackagePath() {
    return path_1.default.join(getMainPath(), '/pkg/');
}
exports.getPackagePath = getPackagePath;
/**
 * Get the path to the given package's binary file
 */
function getPackageFilePath(pkg) {
    return path_1.default.join(getPackagePath(), pkg.file);
}
exports.getPackageFilePath = getPackageFilePath;
/**
 * Get the path to the /qcl/data.json file
 */
function getDataPath() {
    return path_1.default.join(getMainPath(), 'data.json');
}
exports.getDataPath = getDataPath;
