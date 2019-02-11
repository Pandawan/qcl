"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = require("./path");
/**
 * Save the given data to the /qcl/data.json file
 */
async function setData(data) {
    const dataPath = path_1.getDataPath();
    try {
        // Make sure the entire path exists
        await fs_extra_1.default.ensureFile(dataPath);
        // Write the default data to the path
        await fs_extra_1.default.writeJSON(dataPath, data);
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
    const dataPath = path_1.getDataPath();
    try {
        // Make sure that the path exists
        await fs_extra_1.default.ensureFile(dataPath);
        // Get the current data
        const currentData = await fs_extra_1.default.readJson(dataPath);
        // Merge the currentData with the defaultData (preferring to keep currentData)
        // this allows for a "mostly backwards compatible upgrade" of data.json
        const data = Object.assign(defaultData(), currentData);
        // Write the changes
        await fs_extra_1.default.writeJSON(dataPath, data);
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
        package_manager: 'npm',
        packages: [],
        preservation_time: [48, 'hours'],
    };
}
exports.defaultData = defaultData;
async function getPackageManager() {
    const data = await getData();
    return data.package_manager;
}
exports.default = getPackageManager;
