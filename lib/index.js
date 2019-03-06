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
        return qcl.install.run(args[0], undefined);
    }
    const parsedExpiry = qcl.parseDuration(args[1].expiry);
    return qcl.install.run(args[0], parsedExpiry);
}));
commander_1.default
    .command('uninstall <package>')
    .alias('u')
    .description('Uninstalls <package> using npm')
    .action(withErrors(qcl.uninstall.run));
commander_1.default
    .command('cleanup')
    .alias('c')
    .description('Uninstalls all packages that have expired')
    .action(withErrors(qcl.cleanup.run));
commander_1.default
    .command('list')
    .alias('l')
    .description('Lists all packages installed using qcl and their expiration')
    .action(withErrors(qcl.list.run));
commander_1.default
    .command('set <key> <value>')
    .alias('s')
    .description(`Set config elements to be used by qcl ${
// Add extra help if using the qcl set --help (but don't if doing qcl --help)
// Essentially this ONLY shows the help if --help is AFTER set
/set (.*)(-h|--help)/.test(process.argv.join(' '))
    ? '\n' + qcl.set.help()
    : ''}`)
    .action(withErrors((...args) => {
    if (args[0] === 'expiry' || args[0] === 'e') {
        const parsedExpiry = qcl.parseDuration(args[1]);
        return qcl.set.run(args[0], parsedExpiry);
    }
    else {
        return qcl.set.run(args[0], args[1]);
    }
}));
// Any other argument that isn't specified
commander_1.default.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', commander_1.default.args.join(' '));
    process.exit(1);
});
commander_1.default.parse(process.argv);
// Default action if no arguments are passed
if (commander_1.default.args.length === 0) {
    withErrors(qcl.cleanup.run)().catch(undefined);
}
function withErrors(command) {
    return async (...args) => {
        try {
            await command(...args);
        }
        catch (e) {
            console.error(e.message);
            process.exitCode = 1;
        }
        // Add an extra blank line after calling a command
        console.log('');
    };
}
// Export qcl as default so it can be used as a node package (as well as CLI)
exports.default = qcl;
