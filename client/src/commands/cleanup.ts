import moment from 'moment';

import { getData } from '../universal/data';
import uninstall from './uninstall';

/**
 * Runs basic qcl tasks and cleanup
 */
export default async function cleanup() {
  console.log('Cleaning up old packages.');

  // Fetch data
  const data = await getData();

  try {
    // Get a list of packages that have expired
    const packagesToUninstall = data.packages.filter(pkg =>
      // If the install date + 48 hours < current date, uninstall this package
      moment(pkg.installed)
        .add(data.preservation_time[0], data.preservation_time[1])
        .isBefore(moment())
    );

    // Loop through the list of packages and uninstall them
    for (const pkg of packagesToUninstall) {
      await uninstall(pkg.name);
    }

    console.log('Successfully cleaned up packages.');
  } catch (error) {
    throw error;
  }
}
