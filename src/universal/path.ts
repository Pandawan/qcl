import path from 'path';

/**
 * Get the path to the main /qcl/ directory.
 */
export function getMainPath() {
  // Different path based on platform
  switch (process.platform) {
    case 'darwin':
    case 'linux':
      return '/usr/local/lib/qcl/';
    case 'win32':
      return `${process.env.APPDATA}/qcl/`;
    default:
      // TODO: Better platform support
      throw new Error('Platform not supported.');
  }
}

/**
 * Get the path to the /qcl/data.json file
 */
export function getDataPath() {
  return path.join(getMainPath(), 'data.json');
}
