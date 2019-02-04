import fse from 'fs-extra';

import { getData, setData } from '../universal/data';
import { getPackageFilePath, getPackagePath } from '../universal/path';

/**
 * Uninstalls the given package
 * @param pkgName The package to uninstall
 */
export default async function uninstall(pkgName: string) {
  if (!pkgName) {
    throw new Error('No package was given.');
  }

  // Fetch data
  const data = await getData();

  // Check that this package is installed.
  const index = data.packages.findIndex(p => p.name === pkgName);
  if (index < 0) {
    throw new Error(`Package "${pkgName}" is not installed.`);
  }

  console.log(`Uninstalling "${pkgName}" in ${getPackagePath()}`);

  const pkg = data.packages[index];

  // Delete the package from file system
  await fse.remove(getPackageFilePath(pkg));

  // Remove the package from the list
  data.packages = data.packages.filter((v, i) => i !== index);

  // Update the data file with changes
  await setData(data);

  console.log(`Package "${pkgName}" was successfully uninstalled.`);
}
