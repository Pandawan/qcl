"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../universal/data");
const utils_1 = require("../universal/utils");
/**
 * Uninstalls the given package
 * @param pkgName The package to uninstall
 */
async function uninstall(pkgName) {
    if (!pkgName) {
        throw new Error('No package was given.');
    }
    // Fetch data
    const { packages } = data_1.getData();
    // Check that this package is installed.
    const index = packages.findIndex(p => p.name === pkgName);
    if (index < 0) {
        throw new Error(`Package "${pkgName}" is not installed.`);
    }
    console.log(`Uninstalling "${pkgName}"`);
    // Actually uninstall the package
    await uninstallPackage(pkgName);
    // Remove the package from the list
    const newPackages = packages.filter((v, i) => i !== index);
    // Update the data file with changes
    data_1.setSingleData('packages', newPackages);
    console.log(`Package "${pkgName}" was successfully uninstalled.`);
}
exports.default = uninstall;
async function uninstallPackage(pkgName) {
    const { package_manager } = data_1.getData();
    if (package_manager === 'npm') {
        // TODO: Allow for extra parameters such as --global and --saveDev
        // TODO: Does sudo work on Windows?
        console.log(await utils_1.getAsync(`sudo npm uninstall ${pkgName} -g`));
    }
    else if (package_manager === 'yarn') {
        console.log(await utils_1.getAsync(`sudo yarn global remove ${pkgName}`));
    }
}
