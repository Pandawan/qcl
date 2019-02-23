"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const table_1 = require("table");
const data_1 = require("../universal/data");
const utils_1 = require("../universal/utils");
async function run(key, value) {
    let finalValue = value;
    if (key === 'package_manager' || key === 'pm') {
        if (key === 'pm') {
            key = 'package_manager';
        }
        if (value !== 'npm' && value !== 'yarn') {
            throw new Error(`Incorrect value for package_manager, must be "npm" or "yarn"`);
        }
        else {
            finalValue = value;
        }
    }
    else if (key === 'expiry' || key === 'e') {
        if (key === 'e') {
            key = 'expiry';
        }
        if (!utils_1.isValidDuration(value[0], value[1])) {
            throw new Error(`Incorrect value for expiry, must be in format "<NumberUnit>"`);
        }
        else {
            finalValue = [parseInt(value[0], 10), utils_1.convertTimes(value[1])];
        }
    }
    else {
        throw new Error(`No setting found with key ${key}. Try "qcl set --help" for a list of possible keys.`);
    }
    // Save data to config
    data_1.setSingleData(key, finalValue);
    console.log(`Successfully set "${key}" to "${finalValue}"`);
}
exports.run = run;
function help() {
    return table_1.table([
        ['key', 'value'],
        ['package_manager', 'npm/yarn'],
        ['expiry', '<NumberUnit>'],
    ], {
        border: table_1.getBorderCharacters('void'),
        columnDefault: {
            paddingLeft: 1,
            paddingRight: 1,
        },
        drawHorizontalLine: () => false,
    });
}
exports.help = help;
