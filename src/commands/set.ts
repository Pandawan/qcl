import { setSingleData } from '../universal/data';
import { convertTimes, isValidDuration } from '../universal/utils';

export default async function set(key: string, value: any) {
  let finalValue = value;
  if (key === 'package_manager') {
    if (value[0] !== 'npm' && value[0] !== 'yarn') {
      throw new Error(
        `Incorrect value for package_manager, must be "npm" or "yarn"`
      );
    } else {
      finalValue = value[0];
    }
  } else if (key === 'expiry') {
    if (!isValidDuration(value[0], value[1])) {
      throw new Error(
        `Incorrect value for expiry, must be in format "number units"`
      );
    } else {
      finalValue = [parseInt(value[0], 10), convertTimes(value[1])];
    }
  } else {
    throw new Error(`No setting found with key ${key}.`);
  }

  // Save data to config
  setSingleData(key, finalValue);

  console.log(`Successfully set "${key}" to "${finalValue}"`);
}
