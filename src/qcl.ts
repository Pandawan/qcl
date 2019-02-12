import * as cleanup from './commands/cleanup';
import * as install from './commands/install';
import * as list from './commands/list';
import * as set from './commands/set';
import * as uninstall from './commands/uninstall';

// TODO: Fix import/export issue where you need to do cleanup.default() instead of cleanup() because otherwise cleanup's other exports aren't exported...
export { cleanup, install, list, uninstall, set };
