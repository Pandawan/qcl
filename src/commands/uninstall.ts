import cmd from 'node-cmd';

import getPackageManager, { getData, setData } from '../universal/data';

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

  console.log(`Uninstalling "${pkgName}"}`);

  // Actually uninstall the package
  uninstallPackage(pkgName);

  // Remove the package from the list
  data.packages = data.packages.filter((v, i) => i !== index);

  // Update the data file with changes
  await setData(data);

  console.log(`Package "${pkgName}" was successfully uninstalled.`);
}

async function uninstallPackage(pkgName: string): Promise<void> {
  // TODO: Maybe make this cleaner using a separate class?
  const pkgManager = await getPackageManager();
  if (pkgManager === 'npm') {
    // TODO: Allow for extra parameters such as --global and --saveDev
    await cmd.run(`npm uninstall ${pkgName} -g`);
  } else if (pkgManager === 'yarn') {
    await cmd.run(`yarn global remove ${pkgName}`);
  }
}
