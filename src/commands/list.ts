import moment from 'moment';
import { getBorderCharacters, table } from 'table';

import { getData } from '../universal/data';
import { Expiry, IData, IPackage } from '../universal/interfaces';

/**
 * List all packages installed
 */
export default async function list(): Promise<IPackage[]> {
  try {
    const data = await getData();

    // If there are packages installed
    if (data.packages && data.packages.length !== 0) {
      console.log(await tableOutput(data));
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
async function tableOutput(data: IData): Promise<string> {
  // Prepare table columns using command options
  const tableData = [['Name', 'Installed', 'Expires']];

  // Add table data
  for (const pkg of data.packages) {
    const values = [
      pkg.name,
      moment(pkg.installed).format('YYYY-MM-DD hh:mmA'),
      expireTime(pkg.installed, pkg.expiry || data.expiry),
    ];
    tableData.push(values);
  }

  return table(tableData, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 1,
      paddingRight: 1,
    },
    drawHorizontalLine: () => false,
  });
}

/**
 * Get when the package with the given install date will expire (in units)
 * @param installedDate The time at which the package was installed
 * @param preservationTime How long the package is supposed to be preserved
 */
export function expireTime(installedDate: string, preservationTime: Expiry) {
  // Calculate difference between expiry date & current date
  const timeDifference = moment(installedDate)
    .add(preservationTime[0], preservationTime[1])
    // Use same units as preservationTime
    .diff(moment());

  return moment.duration(timeDifference).humanize(true);
}
