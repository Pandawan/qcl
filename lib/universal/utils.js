"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cmd_1 = __importDefault(require("node-cmd"));
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
