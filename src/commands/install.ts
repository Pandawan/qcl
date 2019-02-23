import moment from 'moment';

import { getData, setSingleData } from '../universal/data';
import { Expiry, IPackage } from '../universal/interfaces';
import { getAsync, isValidDuration } from '../universal/utils';

/**
 * Installs the given package
 * @param pkgName The package to install
 */
export async function run(pkgName: string, expiry: Expiry | undefined) {
  if (!pkgName) {
    throw new Error('No package was given.');
  }

  if (
    expiry &&
    (expiry.length !== 2 || !isValidDuration(expiry[0], expiry[1]))
  ) {
    throw new Error(
      'Incorrect value for expiry, must be in format "<amount><units>"'
    );
  }

  const { packages } = getData();

  // If already installed, remove it so that it can be updated
  const pAlready = packages.findIndex(p => p.name === pkgName);
  if (pAlready >= 0) {
    packages.splice(pAlready, 1);
  }

  console.log(`Installing "${pkgName}"`);

  // Install the package
  const pkg = await installPackage(pkgName, expiry);

  // Add the package to the packages list and save it
  packages.push(pkg);
  setSingleData('packages', packages);

  console.log(`Package "${pkgName}" was successfully installed.`);
}

async function installPackage(
  pkgName: string,
  expiry: Expiry | undefined
): Promise<IPackage> {
  const pkg: IPackage = {
    expiry: expiry || undefined,
    installed: moment().toISOString(),
    name: pkgName,
  };

  const { package_manager } = getData();

  if (package_manager === 'npm') {
    // TODO: Allow for extra parameters such as --global and --saveDev
    console.log(await getAsync(`sudo npm install ${pkgName} -g`));
  } else if (package_manager === 'yarn') {
    console.log(await getAsync(`sudo yarn global add ${pkgName}`));
  }
  return pkg;
}
