#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const qcl_1 = __importDefault(require("./qcl"));
commander_1.default.version(process.env.npm_package_version || 'unknown', '-v, --version');
commander_1.default
    .command('install <package>')
    .description('description')
    .alias('i')
    .action(withErrors(qcl_1.default.install));
commander_1.default
    .command('uninstall <package>')
    .alias('u')
    .description('description')
    .action(withErrors(qcl_1.default.uninstall));
commander_1.default
    .command('cleanup')
    .alias('c')
    .description('description')
    .action(withErrors(qcl_1.default.cleanup));
commander_1.default
    .command('list')
    .alias('l')
    .description('description')
    .option('-v --versions', 'Show package version.')
    .option('-e --expires', 'Show package expiry date.')
    .action(withErrors((...args) => {
    const cmd = args[args.length - 1];
    // Format Options from Commmand
    const options = [cmd.expires ? 'expires' : undefined];
    return qcl_1.default.list(options);
}));
// Any other argument that isn't specified
commander_1.default.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', commander_1.default.args.join(' '));
    process.exit(1);
});
commander_1.default.parse(process.argv);
// Default action if no arguments are passed
if (commander_1.default.args.length === 0) {
    qcl_1.default.cleanup();
}
function withErrors(command) {
    return async (...args) => {
        try {
            await command(...args);
        }
        catch (e) {
            console.log(e.stack);
            process.exitCode = 1;
        }
        // Add an extra blank line after calling a command
        console.log('');
    };
}
// Export qcl as default so it can be used as a node package (as well as CLI)
exports.default = qcl_1.default;
