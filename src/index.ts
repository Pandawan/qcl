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

      const parsedExpiry = qcl.parseDuration(args[1].expiry);
      return qcl.install.default(args[0], parsedExpiry);
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
  .alias('s')
  .description('description')
  .action(
    withErrors((...args: any[]) => {
      if (args[0] === 'expiry' || args[0] === 'e') {
        const parsedExpiry = qcl.parseDuration(args[1]);
        return qcl.set.default(args[0], parsedExpiry);
      } else {
        return qcl.set.default(args[0], args[1]);
      }
    })
  );

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
