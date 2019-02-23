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
        const data = data_1.getData();
        // If there are packages installed
        if (data.packages && data.packages.length !== 0) {
            console.log(await tableOutput(data));
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
async function tableOutput(data) {
    // Prepare table columns using command options
    const tableData = [['Name', 'Installed', 'Expires']];
    // Add table data
    for (const pkg of data.packages) {
        const values = [
            pkg.name,
            moment_1.default(pkg.installed).format('YYYY-MM-DD hh:mmA'),
            expireTime(pkg.installed, pkg.expiry || data.expiry),
        ];
        tableData.push(values);
    }
    return table_1.table(tableData, {
        border: table_1.getBorderCharacters('void'),
        columnDefault: {
            paddingLeft: 1,
            paddingRight: 1,
        },
        drawHorizontalLine: () => false,
    });
}
/**
 * Get when the package with the given install date will expire (in units)
 * @param installedDate The time at which the package was installed
 * @param preservationTime How long the package is supposed to be preserved
 */
function expireTime(installedDate, preservationTime) {
    // Calculate difference between expiry date & current date
    const timeDifference = moment_1.default(installedDate)
        .add(preservationTime[0], preservationTime[1])
        // Use same units as preservationTime
        .diff(moment_1.default());
    return moment_1.default.duration(timeDifference).humanize(true);
}
exports.expireTime = expireTime;
