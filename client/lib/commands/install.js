"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const data_1 = require("../universal/data");
const path_1 = require("../universal/path");
/**
 * Installs the given package
 * @param pkgName The package to install
 */
async function install(pkgName) {
    if (!pkgName) {
        throw new Error('No package was given.');
    }
    const data = await data_1.getData();
    if (data.packages.find(p => p.name === pkgName)) {
        throw new Error(`Package "${pkgName}" is already installed.`);
    }
    // Download the file itself
    const pkg = downloadPackage(pkgName);
    console.log(`Installing "${pkgName}" in ${path_1.getPackageFilePath(pkg)}`);
    // Add the package to the packages list and save it
    data.packages.push(pkg);
    await data_1.setData(data);
    console.log(`Package "${pkgName}" was successfully installed.`);
}
exports.default = install;
/**
 * Download the given package and return a new package object
 * @param pkgName The name of the package to download
 */
function downloadPackage(pkgName) {
    // TODO: Make an axios request
    // Create a new package object
    const pkg = {
        file: `${pkgName}`,
        installed: moment_1.default().toISOString(),
        name: pkgName,
    };
    return pkg;
}
