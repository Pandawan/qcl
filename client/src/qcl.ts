import fse from 'fs-extra';
import path from 'path';

// TODO: Might want to rename those to "better" names
interface IQCLPackage {
  /**
   * Name of the package installed
   */
  name: string;
  /**
   * Id of the package installed
   * (most likely a path-compatible snake_case version of the name).
   */
  id: string;
  /**
   * Date of installation in ISO 8601 format
   */
  installed: string;
}

interface IQCLData {
  packages: IQCLPackage[];
}

/**
 * Runs basic qcl tasks and cleanup
 */
function cleanup() {
  console.log('Cleaning up...');
  // TODO: Cleanup packages
}

// TODO: Allow for multiple packages (using spread operator)
/**
 * Installs the given package
 */
function install(pkg: string) {
  if (!pkg) {
    throw new Error('No package was given');
  }

  console.log(`Installing "${pkg}" in ${getDataPath('packages')}`);
  // TODO: Install packages
}

// TODO: Probably want to store the list of currently installed packages in a file in the /qcl/ folder along with its install date (so it can be removed in 48hours)

/**
 * Uninstalls the given package
 */
function uninstall(pkg: string) {
  if (!pkg) {
    throw new Error('No package was given');
  }

  console.log(`Uninstalling "${pkg}" in ${getDataPath('packages')}`);
  // TODO: Uninstall packages
}

/**
 * List all packages installed
 */
async function list(): Promise<IQCLPackage[]> {
  try {
    const data = await getData();
    console.log(
      data.packages && data.packages.length !== 0
        ? data.packages.join(', ')
        : 'No packages installed.'
    );
    return data.packages;
  } catch (error) {
    // TODO: Better error handling
    throw error;
  }
}

/**
 * Get the qcl data
 */
async function getData(): Promise<IQCLData> {
  try {
    // If the path exists, read it and return its data
    if (await fse.pathExists(getDataPath('data'))) {
      // Read the JSON file and return its data
      const data: IQCLData = await fse.readJson(getDataPath('data'));
      return data;
    } else {
      const data: IQCLData = defaultData();
      // Write the default data to the path
      await fse.writeJSON(getDataPath('data'), data);
      return data;
    }
  } catch (error) {
    // TODO: Better error handling
    throw error;
  }
}

/**
 * Create a default data object
 */
function defaultData(): IQCLData {
  return { packages: [] };
}

// TODO: Might want to separate this function into three?
/**
 * Get the path to an important section
 * @param type The type of path to access.
 * undefined/directory: path to qcl directory
 * packages: path to the pkg directory
 * data: path to the data file
 */
function getDataPath(
  type?: 'directory' | 'packages' | 'data' | undefined
): string {
  let dataPath;

  // Different path based on platform
  switch (process.platform) {
    case 'darwin':
    case 'linux':
      dataPath = '/usr/local/lib/qcl/';
      break;
    case 'win32':
      dataPath = `${process.env.APPDATA}/qcl/`;
      break;
    default:
      // TODO: Better platform support
      throw new Error('Platform not supported!');
  }

  // Different path based on requested type
  switch (type) {
    case 'directory':
    case undefined:
      return path.normalize(dataPath);
    case 'packages':
      return path.join(dataPath, '/pkg/');
    case 'data':
      return path.join(dataPath, 'data.json');
    default:
      // TODO: Better error messages
      throw new Error(
        `Data Path type must be one of ['directory', 'packages', 'data']`
      );
  }
}

// TODO: Should getDataPath, getPackagePath, etc. be exported?
export default { install, uninstall, cleanup, list };
