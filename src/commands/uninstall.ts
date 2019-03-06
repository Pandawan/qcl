import { getData, setSingleData } from '../universal/data';
import { getAsync } from '../universal/utils';
import * as cleanup from './cleanup';

/**
 * Uninstalls the given package
 * @param pkgName The package to uninstall
 */
export async function run(pkgName: string) {
  await cleanup.run();
  // Once cleanup is done, call the main function
  // This is required because otherwise cleanup calls itself.
  await uninstallAfterCleanup(pkgName);
}

/**
 * This should only be used internally by the uninstall and cleanup commands.
 */
export async function uninstallAfterCleanup(pkgName: string): Promise<void> {
  if (!pkgName) {
    throw new Error('No package was given.');
  }

  // Fetch data
  const { packages } = getData();

  // Check that this package is installed.
  const index = packages.findIndex(p => p.name === pkgName);
  if (index < 0) {
    throw new Error(`Package "${pkgName}" is not installed.`);
  }

  console.log(`Uninstalling "${pkgName}"`);

  // Actually uninstall the package
  await uninstallPackage(pkgName);

  // Remove the package from the list
  const newPackages = packages.filter((v, i) => i !== index);

  // Update the data file with changes
  setSingleData('packages', newPackages);

  console.log(`Package "${pkgName}" was successfully uninstalled.`);
}

async function uninstallPackage(pkgName: string): Promise<void> {
  const { package_manager } = getData();
  if (package_manager === 'npm') {
    await getAsync(`npm uninstall ${pkgName} -g`);
  } else if (package_manager === 'yarn') {
    await getAsync(`sudo yarn global remove ${pkgName}`);
  }
}
