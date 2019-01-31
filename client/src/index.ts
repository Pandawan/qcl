#!/usr/bin/env node

import program from 'commander';
import qcl from './qcl';

program.version(process.env.npm_package_version || 'unknown', '-v, --version');

program
  .command('install <package>')
  .description('description')
  .alias('i')
  .action(qcl.install);

program
  .command('uninstall <package>')
  .alias('u')
  .description('description')
  .action(qcl.uninstall);

program
  .command('cleanup')
  .alias('c')
  .description('description')
  .action(qcl.cleanup);

program
  .command('list')
  .alias('l')
  .description('description')
  .action(qcl.list);

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

// Export qcl as default so it can be used as a node package (as well as CLI)
export default qcl;
