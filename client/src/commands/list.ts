import moment from 'moment';
import { getBorderCharacters, table } from 'table';

import { getData } from '../universal/data';
import { IPackage } from '../universal/interfaces';

/**
 * List all packages installed
 */
export default async function list(): Promise<IPackage[]> {
  try {
    const data = await getData();

    // If there are packages installed
    if (data.packages && data.packages.length !== 0) {
      console.log(tableOutput(data.packages));
    } else {
      console.log('No packages installed.');
    }

    return data.packages;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a formatted CLI table of all packages
 */
function tableOutput(packages: IPackage[]): string {
  // TODO: Add 'expires' and 'version' values

  const data = [['Name', 'Installed']].concat(
    packages.map(pkg => [
      pkg.name,
      // TODO: Find better format
      moment(pkg.installed).format('YYYY-MM-DD hh:mm a'),
    ])
  );

  return table(data, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 1,
      paddingRight: 1,
    },
    drawHorizontalLine: () => false,
  });
}
