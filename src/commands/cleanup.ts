import moment from 'moment';

import { defaultData, getData, setSingleData } from '../universal/data';
import * as uninstall from './uninstall';

/**
 * Runs basic qcl tasks and cleanup
 */
export async function run() {
  console.log('Cleaning up old packages.');

  // Cleanup the data file
  cleanupDataFile();

  // Cleanup/Uninstall expired packages
  await cleanupPackages();
}

/**
 * Uninstall expired packages
 */
async function cleanupPackages() {
  const data = getData();
  try {
    // Get a list of packages that have expired
    const packagesToUninstall = data.packages.filter(pkg => {
      // If the install date + 48 hours < current date, uninstall this package
      if (pkg.expiry) {
        return moment(pkg.installed)
          .add(pkg.expiry[0], pkg.expiry[1])
          .isBefore(moment());
      } else {
        return moment(pkg.installed)
          .add(data.expiry[0], data.expiry[1])
          .isBefore(moment());
      }
    });

    // Loop through the list of packages and uninstall them
    for (const pkg of packagesToUninstall) {
      await uninstall.run(pkg.name);
    }

    console.log('Successfully cleaned up packages.');
  } catch (error) {
    throw error;
  }
}

/**
 * Cleans Up/Upgrades the data file by removing useless/outdated properties.
 * This does it dynamically by keeping all of the properties that are in common with defaultData.
 */
function cleanupDataFile() {
  const data = getData();
  // Get common properties between defaultData and currentData (data)
  const commonProperties = Object.keys(defaultData()).filter(key => {
    return key in data;
  });

  // Only keep the ones that are in common
  commonProperties.forEach((property: string) => {
    const value = (data as any)[property];
    setSingleData(property, value);
  });
}
