import moment from 'moment';
import { getBorderCharacters, table } from 'table';

import { getData } from '../universal/data';
import { IPackage } from '../universal/interfaces';

export type ListArgs = 'expires' | 'versions' | undefined;

/**
 * List all packages installed
 */
export default async function list(args: ListArgs[]): Promise<IPackage[]> {
  try {
    const data = await getData();

    // If there are packages installed
    if (data.packages && data.packages.length !== 0) {
      console.log(tableOutput(data.packages, args));
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
function tableOutput(packages: IPackage[], args: ListArgs[]): string {
  // TODO: Add 'expires' and 'version' values

  // Prepare table columns using command options
  const data = [['Name', 'Installed']];
  if (args.includes('versions')) data[0].push('Version');
  if (args.includes('expires')) data[0].push('Expires');

  // Add actual table data
  data.concat(
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
