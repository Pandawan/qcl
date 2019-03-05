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
const data_1 = require("../universal/data");
const uninstall = __importStar(require("./uninstall"));
/**
 * Runs basic qcl tasks and cleanup
 */
async function run() {
    console.log('Cleaning up old packages.');
    // Cleanup the data file
    cleanupDataFile();
    // Cleanup/Uninstall expired packages
    await cleanupPackages();
}
exports.run = run;
/**
 * Uninstall expired packages
 */
async function cleanupPackages() {
    const data = data_1.getData();
    try {
        // Get a list of packages that have expired
        const packagesToUninstall = data.packages.filter(pkg => {
            // If the install date + 48 hours < current date, uninstall this package
            if (pkg.expiry) {
                return moment_1.default(pkg.installed)
                    .add(pkg.expiry[0], pkg.expiry[1])
                    .isBefore(moment_1.default());
            }
            else {
                return moment_1.default(pkg.installed)
                    .add(data.expiry[0], data.expiry[1])
                    .isBefore(moment_1.default());
            }
        });
        // Different message if no packages
        if (packagesToUninstall.length === 0) {
            console.log('No packages to clean up.');
            return;
        }
        // Loop through the list of packages and uninstall them
        for (const pkg of packagesToUninstall) {
            await uninstall.run(pkg.name);
        }
        console.log('Successfully cleaned up packages.');
    }
    catch (error) {
        throw error;
    }
}
/**
 * Cleans Up/Upgrades the data file by removing useless/outdated properties.
 * This does it dynamically by keeping all of the properties that are in common with defaultData.
 */
function cleanupDataFile() {
    const data = data_1.getData();
    // Get common properties between defaultData and currentData (data)
    const commonProperties = Object.keys(data_1.defaultData()).filter(key => {
        return key in data;
    });
    // Only keep the ones that are in common
    commonProperties.forEach((property) => {
        const value = data[property];
        data_1.setSingleData(property, value);
    });
}
