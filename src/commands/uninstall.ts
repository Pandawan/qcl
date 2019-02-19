import { getData, setSingleData } from '../universal/data';
import { getAsync } from '../universal/utils';

/**
 * Uninstalls the given package
 * @param pkgName The package to uninstall
 */
export default async function uninstall(pkgName: string) {
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
    // TODO: Allow for extra parameters such as --global and --saveDev
    // TODO: Does sudo work on Windows?
    console.log(await getAsync(`sudo npm uninstall ${pkgName} -g`));
  } else if (package_manager === 'yarn') {
    console.log(await getAsync(`sudo yarn global remove ${pkgName}`));
  }
}
