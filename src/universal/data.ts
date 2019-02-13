import conf from 'conf';

import { IData, PackageManager } from './interfaces';

const config = new conf();

/**
 * Save the given data to the /qcl/data.json file
 */
export function setData(data: IData) {
  try {
    config.set(data);
  } catch (error) {
    throw error;
  }
}

/**
 * Get the data from the /qcl/data.json file (and silent-upgrade it)
 */
export async function getData(): Promise<IData> {
  try {
    // Get the current data
    const currentData = config.store as IData;
    // Merge the currentData with the defaultData (preferring to keep currentData)
    // this allows for a "mostly backwards compatible upgrade" of data.json
    const data = Object.assign(defaultData(), currentData);
    // Write the changes
    config.set(data);
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
    expiry: [48, 'hours'],
    package_manager: 'npm',
    packages: [],
  };
}

export default async function getPackageManager(): Promise<PackageManager> {
  const data = await getData();
  return data.package_manager;
}