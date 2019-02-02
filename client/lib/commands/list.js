"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const table_1 = require("table");
const data_1 = require("../universal/data");
/**
 * List all packages installed
 */
async function list() {
    try {
        const data = await data_1.getData();
        // If there are packages installed
        if (data.packages && data.packages.length !== 0) {
            console.log(tableOutput(data.packages));
        }
        else {
            console.log('No packages installed.');
        }
        return data.packages;
    }
    catch (error) {
        throw error;
    }
}
exports.default = list;
/**
 * Create a formatted CLI table of all packages
 */
function tableOutput(packages) {
    // TODO: Add 'expires' and 'version' values
    const data = [['Name', 'Installed']].concat(packages.map(pkg => [
        pkg.name,
        // TODO: Find better format
        moment_1.default(pkg.installed).format('YYYY-MM-DD hh:mm a'),
    ]));
    return table_1.table(data, {
        border: table_1.getBorderCharacters('void'),
        columnDefault: {
            paddingLeft: 1,
            paddingRight: 1,
        },
        drawHorizontalLine: () => false,
    });
}
