"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const data_1 = require("../universal/data");
const uninstall_1 = __importDefault(require("./uninstall"));
/**
 * Runs basic qcl tasks and cleanup
 */
async function cleanup() {
    console.log('Cleaning up old packages.');
    // Fetch data
    const data = await data_1.getData();
    try {
        // Get a list of packages that have expired
        const packagesToUninstall = data.packages.filter(pkg => 
        // If the install date + 48 hours < current date, uninstall this package
        moment_1.default(pkg.installed)
            .add(data.preservation_time[0], data.preservation_time[1])
            .isBefore(moment_1.default()));
        // Loop through the list of packages and uninstall them
        for (const pkg of packagesToUninstall) {
            await uninstall_1.default(pkg.name);
        }
        console.log('Successfully cleaned up packages.');
    }
    catch (error) {
        throw error;
    }
}
exports.default = cleanup;
