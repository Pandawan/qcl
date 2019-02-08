import moment from 'moment';

import getPackageManager, { getData, setData } from '../universal/data';
import { IPackage } from '../universal/interfaces';
import { getAsync } from '../universal/utils';

/**
 * Installs the given package
 * @param pkgName The package to install
 */
export default async function install(pkgName: string) {
  if (!pkgName) {
    throw new Error('No package was given.');
  }

  const data = await getData();

  if (data.packages.find(p => p.name === pkgName)) {
    throw new Error(`Package "${pkgName}" is already installed.`);
  }

  console.log(`Installing "${pkgName}"`);

  // Install the package
  const pkg = await installPackage(pkgName);

  // Add the package to the packages list and save it
  data.packages.push(pkg);
  await setData(data);

  console.log(`Package "${pkgName}" was successfully installed.`);
}

async function installPackage(pkgName: string): Promise<IPackage> {
  const pkg: IPackage = {
    installed: moment().toISOString(),
    name: pkgName,
  };

  // TODO: Maybe make this cleaner using a separate class?
  const pkgManager = await getPackageManager();
  if (pkgManager === 'npm') {
    // TODO: Allow for extra parameters such as --global and --saveDev
    console.log(await getAsync(`npm install ${pkgName} -g`));
  } else if (pkgManager === 'yarn') {
    console.log(await getAsync(`yarn global add ${pkgName}`));
  }

  return pkg;
}
