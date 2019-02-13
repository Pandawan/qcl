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
    .option('-e --expiry <NumberUnit>', 'Use custom expiry for this package')
    .description('Installs <package> using npm to default npm directory')
    .alias('i')
    .action(withErrors((...args) => {
    // No expiry argument
    if (args[1].expiry === undefined) {
        return qcl.install.default(args[0], undefined);
    }
    // Parse the expiry argument
    const exp = args[1].expiry
        .split(/([0-9]+)/)
        .filter((v) => v !== '');
    // Make sure the expiry arguments are correct
    if (exp.length === 2 &&
        (typeof exp[0] === 'number' || typeof exp[1] === 'string')) {
        return qcl.install.default(args[0], [
            parseInt(exp[0], 10),
            qcl.convertTimes(exp[1]),
        ]);
    }
    else {
        throw new Error(`Incorrect value for expiry, must be in format "number units"`);
    }
}));
commander_1.default
    .command('uninstall <package>')
    .alias('u')
    .description('Uninstalls <package> using npm')
    .action(withErrors(qcl.uninstall.default));
commander_1.default
    .command('cleanup')
    .alias('c')
    .description('Uninstalls all packages that have expired')
    .action(withErrors(qcl.cleanup.default));
commander_1.default
    .command('list')
    .alias('l')
    .description('Lists all packages installed using qcl and their expiration')
    .action(withErrors(qcl.list.default));
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
