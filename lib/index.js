#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const qcl = __importStar(require("./qcl"));
commander_1.default.version(process.env.npm_package_version || 'unknown', '-v, --version');
commander_1.default
    .command('install <package>')
    .description('description')
    .alias('i')
    .action(withErrors(qcl.install.default));
commander_1.default
    .command('uninstall <package>')
    .alias('u')
    .description('description')
    .action(withErrors(qcl.uninstall.default));
commander_1.default
    .command('cleanup')
    .alias('c')
    .description('description')
    .action(withErrors(qcl.cleanup.default));
commander_1.default
    .command('list')
    .alias('l')
    .description('description')
    .option('-v --versions', 'Show package version.')
    .option('-e --expires', 'Show package expiry date.')
    .action(withErrors((...args) => {
    const cmd = args[args.length - 1];
    // Format Options from Commmand
    const options = [
        cmd.expires ? 'expires' : undefined,
    ];
    return qcl.list.default(options);
}));
commander_1.default
    .command('set <key> <value>')
    .alias('l')
    .description('description')
    .action(withErrors(qcl.set.default));
// Any other argument that isn't specified
commander_1.default.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', commander_1.default.args.join(' '));
    process.exit(1);
});
commander_1.default.parse(process.argv);
// Default action if no arguments are passed
if (commander_1.default.args.length === 0) {
    withErrors(qcl.cleanup.default)().catch(undefined);
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
exports.default = qcl;
