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
 * Set a single key/value pair
 * @param key The key to set
 * @param value The value to set
 */
export function setSingleData(key: string, value: string) {
  try {
    config.set(key, value);
  } catch (error) {
    throw error;
  }
}

/**
 * Get the data from the /qcl/data.json file (and silent-upgrade it)
 */
export function getData(): IData {
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

export async function getPackageManager(): Promise<PackageManager> {
  const data = getData();
  return data.package_manager;
}
