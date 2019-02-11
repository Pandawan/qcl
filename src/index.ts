#!/usr/bin/env node

import program, { Command } from 'commander';
import qcl from './qcl';

import { ListArgs } from 'commands/list';

program.version(process.env.npm_package_version || 'unknown', '-v, --version');

program
  .command('install <package>')
  .description('description')
  .alias('i')
  .action(withErrors(qcl.install));

program
  .command('uninstall <package>')
  .alias('u')
  .description('description')
  .action(withErrors(qcl.uninstall));

program
  .command('cleanup')
  .alias('c')
  .description('description')
  .action(withErrors(qcl.cleanup));

program
  .command('list')
  .alias('l')
  .description('description')
  .option('-v --versions', 'Show package version.')
  .option('-e --expires', 'Show package expiry date.')
  .action(
    withErrors((...args: any[]) => {
      const cmd: Command = args[args.length - 1];
      // Format Options from Commmand
      const options: ListArgs[] = [cmd.expires ? 'expires' : undefined];
      return qcl.list(options);
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
  qcl.cleanup();
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
