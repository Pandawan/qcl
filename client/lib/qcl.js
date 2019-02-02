"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cleanup_1 = __importDefault(require("./commands/cleanup"));
const install_1 = __importDefault(require("./commands/install"));
const list_1 = __importDefault(require("./commands/list"));
const uninstall_1 = __importDefault(require("./commands/uninstall"));
exports.default = { install: install_1.default, uninstall: uninstall_1.default, cleanup: cleanup_1.default, list: list_1.default };
