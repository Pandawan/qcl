"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("conf"));
const config = new conf_1.default();
/**
 * Save the given data to the /qcl/data.json file
 */
function setData(data) {
    try {
        config.set(data);
    }
    catch (error) {
        throw error;
    }
}
exports.setData = setData;
/**
 * Get the data from the /qcl/data.json file (and silent-upgrade it)
 */
async function getData() {
    try {
        // Get the current data
        const currentData = config.store;
        // Merge the currentData with the defaultData (preferring to keep currentData)
        // this allows for a "mostly backwards compatible upgrade" of data.json
        const data = Object.assign(defaultData(), currentData);
        // Write the changes
        config.set(data);
        return data;
    }
    catch (error) {
        throw error;
    }
}
exports.getData = getData;
/**
 * Create a default data object
 */
function defaultData() {
    return {
        expiry: [48, 'hours'],
        package_manager: 'npm',
        packages: [],
    };
}
exports.defaultData = defaultData;
async function getPackageManager() {
    const data = await getData();
    return data.package_manager;
}
exports.default = getPackageManager;
