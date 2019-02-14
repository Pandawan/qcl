"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const node_cmd_1 = __importDefault(require("node-cmd"));
/**
 * Execute the command using node-cmd in an ASYNC function
 * @param command The command to run
 */
function getAsync(command) {
    return new Promise((resolve, reject) => {
        node_cmd_1.default.get(command, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
exports.getAsync = getAsync;
/**
 * Converts the given Time Unit to an appropriate one for moment.js
 * @param unit The unit to convert
 */
function convertTimes(unit) {
    switch (unit) {
        case 'min':
            return 'minute';
        case 'mins':
            return 'minutes';
        default:
            return unit;
    }
}
exports.convertTimes = convertTimes;
function isValidDuration(amount, unit) {
    return (
    // Check if first parameter number (amount)
    isNaN(amount) ||
        // Check if second parameter is a string (unit)
        typeof unit !== 'string' ||
        // Chck if valid duration
        moment_1.default
            .duration(parseInt(amount, 10), convertTimes(unit))
            .toISOString() !== 'P0D');
}
exports.isValidDuration = isValidDuration;
