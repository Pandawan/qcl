import moment, { DurationInputArg2, DurationInputObject } from 'moment';
import { getBorderCharacters, table } from 'table';

import { getData } from '../universal/data';
import { IData, IPackage, PreservationTime } from '../universal/interfaces';

export type ListArgs = 'expires' | undefined;

/**
 * List all packages installed
 */
export default async function list(args: ListArgs[]): Promise<IPackage[]> {
  try {
    const data = await getData();

    // If there are packages installed
    if (data.packages && data.packages.length !== 0) {
      console.log(await tableOutput(data, args));
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
async function tableOutput(data: IData, args: ListArgs[]): Promise<string> {
  // Prepare table columns using command options
  const tableData = [['Name', 'Installed']];
  if (args.includes('expires')) tableData[0].push('Expires');

  // Add table data
  for (const pkg of data.packages) {
    const values = [
      pkg.name,
      moment(pkg.installed).format('YYYY-MM-DD hh:mmA'),
    ];
    if (args.includes('expires')) {
      values.push(await expireTime(pkg.installed, data.preservation_time));
    }
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
 */
export async function expireTime(
  installedDate: string,
  preservationTime: PreservationTime
) {
  // Calculate difference between expiry date & current date
  const diff = moment(installedDate)
    .add(preservationTime[0], preservationTime[1])
    // Use same units as preservationTime
    .diff(moment(), preservationTime[1]);

  return `${diff} ${preservationTime[1]}`;
}
