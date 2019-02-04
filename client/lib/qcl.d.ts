import cleanup from './commands/cleanup';
import install from './commands/install';
import list from './commands/list';
import uninstall from './commands/uninstall';
declare const _default: {
    install: typeof install;
    uninstall: typeof uninstall;
    cleanup: typeof cleanup;
    list: typeof list;
};
export default _default;
