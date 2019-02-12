import fse from 'fs-extra';

import { IData, PackageManager } from './interfaces';
import { getDataPath } from './path';

/**
 * Save the given data to the /qcl/data.json file
 */
export async function setData(data: IData): Promise<void> {
  const dataPath = getDataPath();
  try {
    // Make sure the entire path exists
    await fse.ensureFile(dataPath);
    // Write the default data to the path
    await fse.writeJSON(dataPath, data);
  } catch (error) {
    throw error;
  }
}

/**
 * Get the data from the /qcl/data.json file (and silent-upgrade it)
 */
export async function getData(): Promise<IData> {
  const dataPath = getDataPath();
  try {
    // Make sure that the path exists
    await fse.ensureFile(dataPath);
    // Get the current data
    const currentData = await fse.readJson(dataPath);
    // Merge the currentData with the defaultData (preferring to keep currentData)
    // this allows for a "mostly backwards compatible upgrade" of data.json
    const data = Object.assign(defaultData(), currentData);
    // Write the changes
    await fse.writeJSON(dataPath, data);
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a default data object
 */
export function defaultData(): IData {
  return {
    package_manager: 'npm',
    packages: [],
    expiry: [48, 'hours'],
  };
}

export default async function getPackageManager(): Promise<PackageManager> {
  const data = await getData();
  return data.package_manager;
}
