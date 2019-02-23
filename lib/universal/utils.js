"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAsync = getAsync;
exports.convertTimes = convertTimes;
exports.isValidDuration = isValidDuration;
exports.parseDuration = parseDuration;

var _moment = _interopRequireDefault(require("moment"));

var _nodeCmd = _interopRequireDefault(require("node-cmd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Execute the command using node-cmd in an ASYNC function
 * @param command The command to run
 */
function getAsync(command) {
  return new Promise((resolve, reject) => {
    _nodeCmd.default.get(command, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
/**
 * Converts the given Time Unit to an appropriate one for moment.js
 * @param unit The unit to convert
 */


function convertTimes(unit) {
  switch (unit) {
    case 'min':
      return 'minute';

    case 'mins':
      return 'minutes';

    case 'sec':
      return 'second';

    case 'secs':
      return 'seconds';

    default:
      return unit;
  }
}

function isValidDuration(amount, unit) {
  return (// Check if first parameter number (amount)
    isNaN(amount) || // Check if second parameter is a string (unit)
    typeof unit !== 'string' || // Chck if valid duration
    _moment.default.duration(parseInt(amount, 10), convertTimes(unit)).toISOString() !== 'P0D'
  );
}
/**
 * Parses the given string "5hours" into an expiry object [5, "hours"]
 * @param value The value to parse
 */


function parseDuration(value) {
  const exp = value.split(/([0-9]+)/).filter(v => v !== ''); // Make sure the expiry arguments are correct

  if (exp.length === 2 && (typeof exp[0] === 'number' || typeof exp[1] === 'string')) {
    return [parseInt(exp[0], 10), convertTimes(exp[1])];
  } else {
    throw new Error(`Incorrect value for expiry, must be in format "<NumberUnit>"`);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bml2ZXJzYWwvdXRpbHMudHMiXSwibmFtZXMiOlsiZ2V0QXN5bmMiLCJjb21tYW5kIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjbWQiLCJnZXQiLCJlcnIiLCJkYXRhIiwiY29udmVydFRpbWVzIiwidW5pdCIsImlzVmFsaWREdXJhdGlvbiIsImFtb3VudCIsImlzTmFOIiwibW9tZW50IiwiZHVyYXRpb24iLCJwYXJzZUludCIsInRvSVNPU3RyaW5nIiwicGFyc2VEdXJhdGlvbiIsInZhbHVlIiwiZXhwIiwic3BsaXQiLCJmaWx0ZXIiLCJ2IiwibGVuZ3RoIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUdBOzs7O0FBSU8sU0FBU0EsUUFBVCxDQUFrQkMsT0FBbEIsRUFBbUM7QUFDeEMsU0FBTyxJQUFJQyxPQUFKLENBQVksQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEtBQXFCO0FBQ3RDQyxxQkFBSUMsR0FBSixDQUFRTCxPQUFSLEVBQWlCLENBQUNNLEdBQUQsRUFBYUMsSUFBYixLQUEyQjtBQUMxQyxVQUFJRCxHQUFKLEVBQVM7QUFDUEgsUUFBQUEsTUFBTSxDQUFDRyxHQUFELENBQU47QUFDRCxPQUZELE1BRU87QUFDTEosUUFBQUEsT0FBTyxDQUFDSyxJQUFELENBQVA7QUFDRDtBQUNGLEtBTkQ7QUFPRCxHQVJNLENBQVA7QUFTRDtBQUVEOzs7Ozs7QUFJTyxTQUFTQyxZQUFULENBQXNCQyxJQUF0QixFQUFvQztBQUN6QyxVQUFRQSxJQUFSO0FBQ0UsU0FBSyxLQUFMO0FBQ0UsYUFBTyxRQUFQOztBQUNGLFNBQUssTUFBTDtBQUNFLGFBQU8sU0FBUDs7QUFDRixTQUFLLEtBQUw7QUFDRSxhQUFPLFFBQVA7O0FBQ0YsU0FBSyxNQUFMO0FBQ0UsYUFBTyxTQUFQOztBQUNGO0FBQ0UsYUFBT0EsSUFBUDtBQVZKO0FBWUQ7O0FBRU0sU0FBU0MsZUFBVCxDQUF5QkMsTUFBekIsRUFBa0RGLElBQWxELEVBQWdFO0FBQ3JFLFNBQ0U7QUFDQUcsSUFBQUEsS0FBSyxDQUFDRCxNQUFELENBQUwsSUFDQTtBQUNBLFdBQU9GLElBQVAsS0FBZ0IsUUFGaEIsSUFHQTtBQUNBSSxvQkFDR0MsUUFESCxDQUNZQyxRQUFRLENBQUNKLE1BQUQsRUFBZ0IsRUFBaEIsQ0FEcEIsRUFDeUNILFlBQVksQ0FBQ0MsSUFBRCxDQURyRCxFQUVHTyxXQUZILE9BRXFCO0FBUnZCO0FBVUQ7QUFFRDs7Ozs7O0FBSU8sU0FBU0MsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEM7QUFDbkQsUUFBTUMsR0FBRyxHQUFHRCxLQUFLLENBQUNFLEtBQU4sQ0FBWSxVQUFaLEVBQXdCQyxNQUF4QixDQUFnQ0MsQ0FBRCxJQUFlQSxDQUFDLEtBQUssRUFBcEQsQ0FBWixDQURtRCxDQUduRDs7QUFDQSxNQUNFSCxHQUFHLENBQUNJLE1BQUosS0FBZSxDQUFmLEtBQ0MsT0FBT0osR0FBRyxDQUFDLENBQUQsQ0FBVixLQUFrQixRQUFsQixJQUE4QixPQUFPQSxHQUFHLENBQUMsQ0FBRCxDQUFWLEtBQWtCLFFBRGpELENBREYsRUFHRTtBQUNBLFdBQU8sQ0FBQ0osUUFBUSxDQUFDSSxHQUFHLENBQUMsQ0FBRCxDQUFKLEVBQVMsRUFBVCxDQUFULEVBQXVCWCxZQUFZLENBQUNXLEdBQUcsQ0FBQyxDQUFELENBQUosQ0FBbkMsQ0FBUDtBQUNELEdBTEQsTUFLTztBQUNMLFVBQU0sSUFBSUssS0FBSixDQUNILDhEQURHLENBQU47QUFHRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xyXG5pbXBvcnQgY21kIGZyb20gJ25vZGUtY21kJztcclxuaW1wb3J0IHsgRXhwaXJ5IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlIHRoZSBjb21tYW5kIHVzaW5nIG5vZGUtY21kIGluIGFuIEFTWU5DIGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSBjb21tYW5kIFRoZSBjb21tYW5kIHRvIHJ1blxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEFzeW5jKGNvbW1hbmQ6IHN0cmluZykge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICBjbWQuZ2V0KGNvbW1hbmQsIChlcnI6IEVycm9yLCBkYXRhOiBhbnkpID0+IHtcclxuICAgICAgaWYgKGVycikge1xyXG4gICAgICAgIHJlamVjdChlcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIGdpdmVuIFRpbWUgVW5pdCB0byBhbiBhcHByb3ByaWF0ZSBvbmUgZm9yIG1vbWVudC5qc1xyXG4gKiBAcGFyYW0gdW5pdCBUaGUgdW5pdCB0byBjb252ZXJ0XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29udmVydFRpbWVzKHVuaXQ6IHN0cmluZykge1xyXG4gIHN3aXRjaCAodW5pdCkge1xyXG4gICAgY2FzZSAnbWluJzpcclxuICAgICAgcmV0dXJuICdtaW51dGUnO1xyXG4gICAgY2FzZSAnbWlucyc6XHJcbiAgICAgIHJldHVybiAnbWludXRlcyc7XHJcbiAgICBjYXNlICdzZWMnOlxyXG4gICAgICByZXR1cm4gJ3NlY29uZCc7XHJcbiAgICBjYXNlICdzZWNzJzpcclxuICAgICAgcmV0dXJuICdzZWNvbmRzJztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHJldHVybiB1bml0O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWREdXJhdGlvbihhbW91bnQ6IG51bWJlciB8IHN0cmluZywgdW5pdDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIC8vIENoZWNrIGlmIGZpcnN0IHBhcmFtZXRlciBudW1iZXIgKGFtb3VudClcclxuICAgIGlzTmFOKGFtb3VudCBhcyBhbnkpIHx8XHJcbiAgICAvLyBDaGVjayBpZiBzZWNvbmQgcGFyYW1ldGVyIGlzIGEgc3RyaW5nICh1bml0KVxyXG4gICAgdHlwZW9mIHVuaXQgIT09ICdzdHJpbmcnIHx8XHJcbiAgICAvLyBDaGNrIGlmIHZhbGlkIGR1cmF0aW9uXHJcbiAgICBtb21lbnRcclxuICAgICAgLmR1cmF0aW9uKHBhcnNlSW50KGFtb3VudCBhcyBhbnksIDEwKSwgY29udmVydFRpbWVzKHVuaXQpIGFzIGFueSlcclxuICAgICAgLnRvSVNPU3RyaW5nKCkgIT09ICdQMEQnXHJcbiAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBhcnNlcyB0aGUgZ2l2ZW4gc3RyaW5nIFwiNWhvdXJzXCIgaW50byBhbiBleHBpcnkgb2JqZWN0IFs1LCBcImhvdXJzXCJdXHJcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgdmFsdWUgdG8gcGFyc2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUR1cmF0aW9uKHZhbHVlOiBzdHJpbmcpOiBFeHBpcnkge1xyXG4gIGNvbnN0IGV4cCA9IHZhbHVlLnNwbGl0KC8oWzAtOV0rKS8pLmZpbHRlcigodjogc3RyaW5nKSA9PiB2ICE9PSAnJyk7XHJcblxyXG4gIC8vIE1ha2Ugc3VyZSB0aGUgZXhwaXJ5IGFyZ3VtZW50cyBhcmUgY29ycmVjdFxyXG4gIGlmIChcclxuICAgIGV4cC5sZW5ndGggPT09IDIgJiZcclxuICAgICh0eXBlb2YgZXhwWzBdID09PSAnbnVtYmVyJyB8fCB0eXBlb2YgZXhwWzFdID09PSAnc3RyaW5nJylcclxuICApIHtcclxuICAgIHJldHVybiBbcGFyc2VJbnQoZXhwWzBdLCAxMCksIGNvbnZlcnRUaW1lcyhleHBbMV0pIGFzIGFueV07XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgYEluY29ycmVjdCB2YWx1ZSBmb3IgZXhwaXJ5LCBtdXN0IGJlIGluIGZvcm1hdCBcIjxOdW1iZXJVbml0PlwiYFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19