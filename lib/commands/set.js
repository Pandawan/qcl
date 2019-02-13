"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../universal/data");
async function set(key, value) {
    const data = await data_1.getData();
    if (key === 'package_manager') {
        if (value !== 'npm' && value !== 'yarn') {
            throw new Error(`Incorrect value for package_manager, must be "npm" or "yarn"`);
        }
    }
    else if (key === 'expiry') {
        if (value.length !== 2 ||
            typeof value[0] !== 'number' ||
            typeof value[1] !== 'string') {
            throw new Error(`Incorrect value for expiry, must be in format "number units"`);
        }
    }
    else {
        throw new Error(`No setting found with key ${key}.`);
    }
    data[key] = value;
    console.log(`Successfully set "${key}" to "${value}"`);
}
exports.default = set;
