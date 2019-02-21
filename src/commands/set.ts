import { getBorderCharacters, table } from 'table';

import { setSingleData } from '../universal/data';
import { convertTimes, isValidDuration } from '../universal/utils';

export default async function set(key: string, value: any) {
  let finalValue = value;
  if (key === 'package_manager' || key === 'pm') {
    if (key === 'pm') {
      key = 'package_manager';
    }
    if (value !== 'npm' && value !== 'yarn') {
      throw new Error(
        `Incorrect value for package_manager, must be "npm" or "yarn"`
      );
    } else {
      finalValue = value;
    }
  } else if (key === 'expiry' || key === 'e') {
    if (key === 'e') {
      key = 'expiry';
    }
    if (!isValidDuration(value[0], value[1])) {
      throw new Error(
        `Incorrect value for expiry, must be in format "<NumberUnit>"`
      );
    } else {
      finalValue = [parseInt(value[0], 10), convertTimes(value[1])];
    }
  } else {
    throw new Error(
      `No setting found with key ${key}. Try "qcl set --help" for a list of possible keys.`
    );
  }

  // Save data to config
  setSingleData(key, finalValue);

  console.log(`Successfully set "${key}" to "${finalValue}"`);
}

export function help() {
  return table(
    [
      ['key', 'value'],
      ['package_manager', 'npm/yarn'],
      ['expiry', '<NumberUnit>'],
    ],
    {
      border: getBorderCharacters('void'),
      columnDefault: {
        paddingLeft: 1,
        paddingRight: 1,
      },
      drawHorizontalLine: () => false,
    }
  );
}
