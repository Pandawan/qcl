"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../universal/data");
const utils_1 = require("../universal/utils");
async function set(key, value) {
    let finalValue = value;
    if (key === 'package_manager') {
        if (value[0] !== 'npm' && value[0] !== 'yarn') {
            throw new Error(`Incorrect value for package_manager, must be "npm" or "yarn"`);
        }
        else {
            finalValue = value[0];
        }
    }
    else if (key === 'expiry') {
        if (!utils_1.isValidDuration(value[0], value[1])) {
            throw new Error(`Incorrect value for expiry, must be in format "number units"`);
        }
        else {
            finalValue = [parseInt(value[0], 10), utils_1.convertTimes(value[1])];
        }
    }
    else {
        throw new Error(`No setting found with key ${key}.`);
    }
    // Save data to config
    data_1.setSingleData(key, finalValue);
    console.log(`Successfully set "${key}" to "${finalValue}"`);
}
exports.default = set;
