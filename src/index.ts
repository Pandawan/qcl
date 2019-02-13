#!/usr/bin/env node

import program from 'commander';
import * as qcl from './qcl';

program.version(process.env.npm_package_version || 'unknown', '-v, --version');

program
  .command('install <package>')
  .option('-e --expiry <NumberUnit>', 'Use custom expiry for this package')
  .description('Installs <package> using npm to default npm directory')
  .alias('i')
  .action(
    withErrors((...args: any[]) => {
      // No expiry argument
      if (args[1].expiry === undefined) {
        return qcl.install.default(args[0], undefined);
      }

      // Parse the expiry argument
      const exp = args[1].expiry
        .split(/([0-9]+)/)
        .filter((v: string) => v !== '');

      // Make sure the expiry arguments are correct
      if (
        exp.length === 2 &&
        (typeof exp[0] === 'number' || typeof exp[1] === 'string')
      ) {
        return qcl.install.default(args[0], [
          parseInt(exp[0], 10),
          qcl.convertTimes(exp[1]) as any,
        ]);
      } else {
        throw new Error(
          `Incorrect value for expiry, must be in format "number units"`
        );
      }
    })
  );

program
  .command('uninstall <package>')
  .alias('u')
  .description('Uninstalls <package> using npm')
  .action(withErrors(qcl.uninstall.default));

program
  .command('cleanup')
  .alias('c')
  .description('Uninstalls all packages that have expired')
  .action(withErrors(qcl.cleanup.default));

program
  .command('list')
  .alias('l')
  .description('Lists all packages installed using qcl and their expiration')
  .action(withErrors(qcl.list.default));

program
  .command('set <key> <value>')
  .alias('l')
  .description('description')
  .action(withErrors(qcl.set.default));

// Any other argument that isn't specified
program.on('command:*', () => {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  );
  process.exit(1);
});

program.parse(process.argv);

// Default action if no arguments are passed
if (program.args.length === 0) {
  withErrors(qcl.cleanup.default)().catch(undefined);
}

function withErrors(command: (...args: any[]) => Promise<any>) {
  return async (...args: any[]) => {
    try {
      await command(...args);
    } catch (e) {
      console.log(e.stack);
      process.exitCode = 1;
    }
    // Add an extra blank line after calling a command
    console.log('');
  };
}

// Export qcl as default so it can be used as a node package (as well as CLI)
export default qcl;
