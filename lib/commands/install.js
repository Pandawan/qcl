"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const data_1 = __importStar(require("../universal/data"));
const utils_1 = require("../universal/utils");
/**
 * Installs the given package
 * @param pkgName The package to install
 */
async function install(pkgName, expiry) {
    if (!pkgName) {
        throw new Error('No package was given.');
    }
    if (expiry && expiry.length !== 2) {
        throw new Error('Incorrect value for expiry, must be in format "number units"');
    }
    const data = await data_1.getData();
    if (data.packages.find(p => p.name === pkgName)) {
        throw new Error(`Package "${pkgName}" is already installed.`);
    }
    console.log(`Installing "${pkgName}"`);
    // Install the package
    const pkg = await installPackage(pkgName, expiry);
    // Add the package to the packages list and save it
    data.packages.push(pkg);
    await data_1.setData(data);
    console.log(`Package "${pkgName}" was successfully installed.`);
}
exports.default = install;
async function installPackage(pkgName, expiry) {
    const pkg = {
        installed: moment_1.default().toISOString(),
        name: pkgName,
        expiry: expiry || undefined
    };
    // TODO: Maybe make this cleaner using a separate class?
    const pkgManager = await data_1.default();
    if (pkgManager === 'npm') {
        // TODO: Allow for extra parameters such as --global and --saveDev
        console.log(await utils_1.getAsync(`sudo npm install ${pkgName} -g`));
    }
    else if (pkgManager === 'yarn') {
        console.log(await utils_1.getAsync(`sudo yarn global add ${pkgName}`));
    }
    return pkg;
}
