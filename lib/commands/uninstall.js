"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = __importStar(require("../universal/data"));
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
    const data = await data_1.getData();
    // Check that this package is installed.
    const index = data.packages.findIndex(p => p.name === pkgName);
    if (index < 0) {
        throw new Error(`Package "${pkgName}" is not installed.`);
    }
    console.log(`Uninstalling "${pkgName}"`);
    // Actually uninstall the package
    await uninstallPackage(pkgName);
    // Remove the package from the list
    data.packages = data.packages.filter((v, i) => i !== index);
    // Update the data file with changes
    await data_1.setData(data);
    console.log(`Package "${pkgName}" was successfully uninstalled.`);
}
exports.default = uninstall;
async function uninstallPackage(pkgName) {
    // TODO: Maybe make this cleaner using a separate class?
    const pkgManager = await data_1.default();
    if (pkgManager === 'npm') {
        // TODO: Allow for extra parameters such as --global and --saveDev
        console.log(await utils_1.getAsync(`npm uninstall ${pkgName} -g`));
    }
    else if (pkgManager === 'yarn') {
        console.log(await utils_1.getAsync(`yarn global remove ${pkgName}`));
    }
}
