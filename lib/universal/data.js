"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setSingleData = setSingleData;
exports.getData = getData;
exports.defaultData = defaultData;

var _conf = _interopRequireDefault(require("conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = new _conf.default();
/**
 * Set a single key/value pair
 * @param key The key to set
 * @param value The value to set
 */

function setSingleData(key, value) {
  try {
    config.set(key, value);
  } catch (error) {
    throw error;
  }
}
/**
 * Get the data from the data file (and silent-upgrade it)
 */


function getData() {
  try {
    // Get the current data
    const currentData = config.store; // Merge the currentData with the defaultData (preferring to keep currentData)
    // this allows for a "mostly backwards compatible upgrade" of the data file

    const data = Object.assign(defaultData(), currentData); // Write the changes

    config.set(data);
    return data;
  } catch (error) {
    throw error;
  }
}
/**
 * Create a default data object
 */


function defaultData() {
  return {
    expiry: [48, 'hours'],
    package_manager: 'npm',
    packages: []
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bml2ZXJzYWwvZGF0YS50cyJdLCJuYW1lcyI6WyJjb25maWciLCJjb25mIiwic2V0U2luZ2xlRGF0YSIsImtleSIsInZhbHVlIiwic2V0IiwiZXJyb3IiLCJnZXREYXRhIiwiY3VycmVudERhdGEiLCJzdG9yZSIsImRhdGEiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0RGF0YSIsImV4cGlyeSIsInBhY2thZ2VfbWFuYWdlciIsInBhY2thZ2VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUlBLE1BQU1BLE1BQU0sR0FBRyxJQUFJQyxhQUFKLEVBQWY7QUFFQTs7Ozs7O0FBS08sU0FBU0MsYUFBVCxDQUF1QkMsR0FBdkIsRUFBb0NDLEtBQXBDLEVBQWdEO0FBQ3JELE1BQUk7QUFDRkosSUFBQUEsTUFBTSxDQUFDSyxHQUFQLENBQVdGLEdBQVgsRUFBZ0JDLEtBQWhCO0FBQ0QsR0FGRCxDQUVFLE9BQU9FLEtBQVAsRUFBYztBQUNkLFVBQU1BLEtBQU47QUFDRDtBQUNGO0FBRUQ7Ozs7O0FBR08sU0FBU0MsT0FBVCxHQUEwQjtBQUMvQixNQUFJO0FBQ0Y7QUFDQSxVQUFNQyxXQUFXLEdBQUdSLE1BQU0sQ0FBQ1MsS0FBM0IsQ0FGRSxDQUdGO0FBQ0E7O0FBQ0EsVUFBTUMsSUFBSSxHQUFHQyxNQUFNLENBQUNDLE1BQVAsQ0FBY0MsV0FBVyxFQUF6QixFQUE2QkwsV0FBN0IsQ0FBYixDQUxFLENBTUY7O0FBQ0FSLElBQUFBLE1BQU0sQ0FBQ0ssR0FBUCxDQUFXSyxJQUFYO0FBQ0EsV0FBT0EsSUFBUDtBQUNELEdBVEQsQ0FTRSxPQUFPSixLQUFQLEVBQWM7QUFDZCxVQUFNQSxLQUFOO0FBQ0Q7QUFDRjtBQUVEOzs7OztBQUdPLFNBQVNPLFdBQVQsR0FBOEI7QUFDbkMsU0FBTztBQUNMQyxJQUFBQSxNQUFNLEVBQUUsQ0FBQyxFQUFELEVBQUssT0FBTCxDQURIO0FBRUxDLElBQUFBLGVBQWUsRUFBRSxLQUZaO0FBR0xDLElBQUFBLFFBQVEsRUFBRTtBQUhMLEdBQVA7QUFLRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb25mIGZyb20gJ2NvbmYnO1xyXG5cclxuaW1wb3J0IHsgSURhdGEsIFBhY2thZ2VNYW5hZ2VyIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuXHJcbmNvbnN0IGNvbmZpZyA9IG5ldyBjb25mKCk7XHJcblxyXG4vKipcclxuICogU2V0IGEgc2luZ2xlIGtleS92YWx1ZSBwYWlyXHJcbiAqIEBwYXJhbSBrZXkgVGhlIGtleSB0byBzZXRcclxuICogQHBhcmFtIHZhbHVlIFRoZSB2YWx1ZSB0byBzZXRcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTaW5nbGVEYXRhKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbmZpZy5zZXQoa2V5LCB2YWx1ZSk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIHRocm93IGVycm9yO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgZGF0YSBmcm9tIHRoZSBkYXRhIGZpbGUgKGFuZCBzaWxlbnQtdXBncmFkZSBpdClcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXREYXRhKCk6IElEYXRhIHtcclxuICB0cnkge1xyXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IGRhdGFcclxuICAgIGNvbnN0IGN1cnJlbnREYXRhID0gY29uZmlnLnN0b3JlIGFzIElEYXRhO1xyXG4gICAgLy8gTWVyZ2UgdGhlIGN1cnJlbnREYXRhIHdpdGggdGhlIGRlZmF1bHREYXRhIChwcmVmZXJyaW5nIHRvIGtlZXAgY3VycmVudERhdGEpXHJcbiAgICAvLyB0aGlzIGFsbG93cyBmb3IgYSBcIm1vc3RseSBiYWNrd2FyZHMgY29tcGF0aWJsZSB1cGdyYWRlXCIgb2YgdGhlIGRhdGEgZmlsZVxyXG4gICAgY29uc3QgZGF0YSA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdERhdGEoKSwgY3VycmVudERhdGEpO1xyXG4gICAgLy8gV3JpdGUgdGhlIGNoYW5nZXNcclxuICAgIGNvbmZpZy5zZXQoZGF0YSk7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgdGhyb3cgZXJyb3I7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgZGVmYXVsdCBkYXRhIG9iamVjdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHREYXRhKCk6IElEYXRhIHtcclxuICByZXR1cm4ge1xyXG4gICAgZXhwaXJ5OiBbNDgsICdob3VycyddLFxyXG4gICAgcGFja2FnZV9tYW5hZ2VyOiAnbnBtJyxcclxuICAgIHBhY2thZ2VzOiBbXSxcclxuICB9O1xyXG59XHJcbiJdfQ==