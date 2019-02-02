import moment from 'moment';

import { getData, setData } from '../universal/data';
import { IPackage } from '../universal/interfaces';
import { getPackageFilePath } from '../universal/path';

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

  // Download the file itself
  const pkg = downloadPackage(pkgName);

  console.log(`Installing "${pkgName}" in ${getPackageFilePath(pkg)}`);

  // Add the package to the packages list and save it
  data.packages.push(pkg);
  await setData(data);

  console.log(`Package "${pkgName}" was successfully installed.`);
}

/**
 * Download the given package and return a new package object
 * @param pkgName The name of the package to download
 */
function downloadPackage(pkgName: string): IPackage {
  // TODO: Make an axios request

  // Create a new package object
  const pkg: IPackage = {
    file: `${pkgName}`,
    installed: moment().toISOString(),
    name: pkgName,
  };

  return pkg;
}
