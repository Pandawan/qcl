"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conf_1 = __importDefault(require("conf"));
const config = new conf_1.default();
/**
 * Set a single key/value pair
 * @param key The key to set
 * @param value The value to set
 */
function setSingleData(key, value) {
    try {
        config.set(key, value);
    }
    catch (error) {
        throw error;
    }
}
exports.setSingleData = setSingleData;
/**
 * Get the data from the data file (and silent-upgrade it)
 */
function getData() {
    try {
        // Get the current data
        const currentData = config.store;
        // Merge the currentData with the defaultData (preferring to keep currentData)
        // this allows for a "mostly backwards compatible upgrade" of the data file
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
