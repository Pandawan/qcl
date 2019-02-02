"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const data_1 = require("../universal/data");
const path_1 = require("../universal/path");
/**
 * Uninstalls the given package
 * @param pkgName The package to uninstall
 */
async function uninstall(pkgName) {
    if (!pkgName) {
        throw new Error('No package was given.');
    }
    // Fetch data
    const data = await data_1.getData();
    // Check that this package is installed.
    const index = data.packages.findIndex(p => p.name === pkgName);
    if (index < 0) {
        throw new Error(`Package "${pkgName}" is not installed.`);
    }
    console.log(`Uninstalling "${pkgName}" in ${path_1.getPackagePath()}`);
    const pkg = data.packages[index];
    // Delete the package from file system
    await fs_extra_1.default.remove(path_1.getPackageFilePath(pkg));
    // Remove the package from the list
    data.packages = data.packages.filter((v, i) => i !== index);
    // Update the data file with changes
    await data_1.setData(data);
    console.log(`Package "${pkgName}" was successfully uninstalled.`);
}
exports.default = uninstall;
