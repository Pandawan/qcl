import fse from 'fs-extra';

import { IData } from './interfaces';
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
 * Get the data from the /qcl/data.json file
 */
export async function getData(): Promise<IData> {
  const dataPath = getDataPath();
  try {
    // If the path exists, read it and return its data
    if (await fse.pathExists(dataPath)) {
      // Read the JSON file and return its data
      const data: IData = await fse.readJson(dataPath);
      return data;
    } else {
      // Set data using defaultData and return it
      const data: IData = defaultData();
      await setData(data);
      return data;
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Create a default data object
 */
export function defaultData(): IData {
  return { packages: [], preservation_time: [48, 'hours'] };
}
