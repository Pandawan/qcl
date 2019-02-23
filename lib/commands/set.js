"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = set;
exports.help = help;

var _table = require("table");

var _data = require("../universal/data");

var _utils = require("../universal/utils");

async function set(key, value) {
  let finalValue = value;

  if (key === 'package_manager' || key === 'pm') {
    if (key === 'pm') {
      key = 'package_manager';
    }

    if (value !== 'npm' && value !== 'yarn') {
      throw new Error(`Incorrect value for package_manager, must be "npm" or "yarn"`);
    } else {
      finalValue = value;
    }
  } else if (key === 'expiry' || key === 'e') {
    if (key === 'e') {
      key = 'expiry';
    }

    if (!(0, _utils.isValidDuration)(value[0], value[1])) {
      throw new Error(`Incorrect value for expiry, must be in format "<NumberUnit>"`);
    } else {
      finalValue = [parseInt(value[0], 10), (0, _utils.convertTimes)(value[1])];
    }
  } else {
    throw new Error(`No setting found with key ${key}. Try "qcl set --help" for a list of possible keys.`);
  } // Save data to config


  (0, _data.setSingleData)(key, finalValue);
  console.log(`Successfully set "${key}" to "${finalValue}"`);
}

function help() {
  return (0, _table.table)([['key', 'value'], ['package_manager', 'npm/yarn'], ['expiry', '<NumberUnit>']], {
    border: (0, _table.getBorderCharacters)('void'),
    columnDefault: {
      paddingLeft: 1,
      paddingRight: 1
    },
    drawHorizontalLine: () => false
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zZXQudHMiXSwibmFtZXMiOlsic2V0Iiwia2V5IiwidmFsdWUiLCJmaW5hbFZhbHVlIiwiRXJyb3IiLCJwYXJzZUludCIsImNvbnNvbGUiLCJsb2ciLCJoZWxwIiwiYm9yZGVyIiwiY29sdW1uRGVmYXVsdCIsInBhZGRpbmdMZWZ0IiwicGFkZGluZ1JpZ2h0IiwiZHJhd0hvcml6b250YWxMaW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUVBOztBQUNBOztBQUVlLGVBQWVBLEdBQWYsQ0FBbUJDLEdBQW5CLEVBQWdDQyxLQUFoQyxFQUE0QztBQUN6RCxNQUFJQyxVQUFVLEdBQUdELEtBQWpCOztBQUNBLE1BQUlELEdBQUcsS0FBSyxpQkFBUixJQUE2QkEsR0FBRyxLQUFLLElBQXpDLEVBQStDO0FBQzdDLFFBQUlBLEdBQUcsS0FBSyxJQUFaLEVBQWtCO0FBQ2hCQSxNQUFBQSxHQUFHLEdBQUcsaUJBQU47QUFDRDs7QUFDRCxRQUFJQyxLQUFLLEtBQUssS0FBVixJQUFtQkEsS0FBSyxLQUFLLE1BQWpDLEVBQXlDO0FBQ3ZDLFlBQU0sSUFBSUUsS0FBSixDQUNILDhEQURHLENBQU47QUFHRCxLQUpELE1BSU87QUFDTEQsTUFBQUEsVUFBVSxHQUFHRCxLQUFiO0FBQ0Q7QUFDRixHQVhELE1BV08sSUFBSUQsR0FBRyxLQUFLLFFBQVIsSUFBb0JBLEdBQUcsS0FBSyxHQUFoQyxFQUFxQztBQUMxQyxRQUFJQSxHQUFHLEtBQUssR0FBWixFQUFpQjtBQUNmQSxNQUFBQSxHQUFHLEdBQUcsUUFBTjtBQUNEOztBQUNELFFBQUksQ0FBQyw0QkFBZ0JDLEtBQUssQ0FBQyxDQUFELENBQXJCLEVBQTBCQSxLQUFLLENBQUMsQ0FBRCxDQUEvQixDQUFMLEVBQTBDO0FBQ3hDLFlBQU0sSUFBSUUsS0FBSixDQUNILDhEQURHLENBQU47QUFHRCxLQUpELE1BSU87QUFDTEQsTUFBQUEsVUFBVSxHQUFHLENBQUNFLFFBQVEsQ0FBQ0gsS0FBSyxDQUFDLENBQUQsQ0FBTixFQUFXLEVBQVgsQ0FBVCxFQUF5Qix5QkFBYUEsS0FBSyxDQUFDLENBQUQsQ0FBbEIsQ0FBekIsQ0FBYjtBQUNEO0FBQ0YsR0FYTSxNQVdBO0FBQ0wsVUFBTSxJQUFJRSxLQUFKLENBQ0gsNkJBQTRCSCxHQUFJLHFEQUQ3QixDQUFOO0FBR0QsR0E1QndELENBOEJ6RDs7O0FBQ0EsMkJBQWNBLEdBQWQsRUFBbUJFLFVBQW5CO0FBRUFHLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFhLHFCQUFvQk4sR0FBSSxTQUFRRSxVQUFXLEdBQXhEO0FBQ0Q7O0FBRU0sU0FBU0ssSUFBVCxHQUFnQjtBQUNyQixTQUFPLGtCQUNMLENBQ0UsQ0FBQyxLQUFELEVBQVEsT0FBUixDQURGLEVBRUUsQ0FBQyxpQkFBRCxFQUFvQixVQUFwQixDQUZGLEVBR0UsQ0FBQyxRQUFELEVBQVcsY0FBWCxDQUhGLENBREssRUFNTDtBQUNFQyxJQUFBQSxNQUFNLEVBQUUsZ0NBQW9CLE1BQXBCLENBRFY7QUFFRUMsSUFBQUEsYUFBYSxFQUFFO0FBQ2JDLE1BQUFBLFdBQVcsRUFBRSxDQURBO0FBRWJDLE1BQUFBLFlBQVksRUFBRTtBQUZELEtBRmpCO0FBTUVDLElBQUFBLGtCQUFrQixFQUFFLE1BQU07QUFONUIsR0FOSyxDQUFQO0FBZUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRCb3JkZXJDaGFyYWN0ZXJzLCB0YWJsZSB9IGZyb20gJ3RhYmxlJztcclxuXHJcbmltcG9ydCB7IHNldFNpbmdsZURhdGEgfSBmcm9tICcuLi91bml2ZXJzYWwvZGF0YSc7XHJcbmltcG9ydCB7IGNvbnZlcnRUaW1lcywgaXNWYWxpZER1cmF0aW9uIH0gZnJvbSAnLi4vdW5pdmVyc2FsL3V0aWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHNldChrZXk6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gIGxldCBmaW5hbFZhbHVlID0gdmFsdWU7XHJcbiAgaWYgKGtleSA9PT0gJ3BhY2thZ2VfbWFuYWdlcicgfHwga2V5ID09PSAncG0nKSB7XHJcbiAgICBpZiAoa2V5ID09PSAncG0nKSB7XHJcbiAgICAgIGtleSA9ICdwYWNrYWdlX21hbmFnZXInO1xyXG4gICAgfVxyXG4gICAgaWYgKHZhbHVlICE9PSAnbnBtJyAmJiB2YWx1ZSAhPT0gJ3lhcm4nKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgICBgSW5jb3JyZWN0IHZhbHVlIGZvciBwYWNrYWdlX21hbmFnZXIsIG11c3QgYmUgXCJucG1cIiBvciBcInlhcm5cImBcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpbmFsVmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGtleSA9PT0gJ2V4cGlyeScgfHwga2V5ID09PSAnZScpIHtcclxuICAgIGlmIChrZXkgPT09ICdlJykge1xyXG4gICAgICBrZXkgPSAnZXhwaXJ5JztcclxuICAgIH1cclxuICAgIGlmICghaXNWYWxpZER1cmF0aW9uKHZhbHVlWzBdLCB2YWx1ZVsxXSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgIGBJbmNvcnJlY3QgdmFsdWUgZm9yIGV4cGlyeSwgbXVzdCBiZSBpbiBmb3JtYXQgXCI8TnVtYmVyVW5pdD5cImBcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZpbmFsVmFsdWUgPSBbcGFyc2VJbnQodmFsdWVbMF0sIDEwKSwgY29udmVydFRpbWVzKHZhbHVlWzFdKV07XHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgYE5vIHNldHRpbmcgZm91bmQgd2l0aCBrZXkgJHtrZXl9LiBUcnkgXCJxY2wgc2V0IC0taGVscFwiIGZvciBhIGxpc3Qgb2YgcG9zc2libGUga2V5cy5gXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgLy8gU2F2ZSBkYXRhIHRvIGNvbmZpZ1xyXG4gIHNldFNpbmdsZURhdGEoa2V5LCBmaW5hbFZhbHVlKTtcclxuXHJcbiAgY29uc29sZS5sb2coYFN1Y2Nlc3NmdWxseSBzZXQgXCIke2tleX1cIiB0byBcIiR7ZmluYWxWYWx1ZX1cImApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGVscCgpIHtcclxuICByZXR1cm4gdGFibGUoXHJcbiAgICBbXHJcbiAgICAgIFsna2V5JywgJ3ZhbHVlJ10sXHJcbiAgICAgIFsncGFja2FnZV9tYW5hZ2VyJywgJ25wbS95YXJuJ10sXHJcbiAgICAgIFsnZXhwaXJ5JywgJzxOdW1iZXJVbml0PiddLFxyXG4gICAgXSxcclxuICAgIHtcclxuICAgICAgYm9yZGVyOiBnZXRCb3JkZXJDaGFyYWN0ZXJzKCd2b2lkJyksXHJcbiAgICAgIGNvbHVtbkRlZmF1bHQ6IHtcclxuICAgICAgICBwYWRkaW5nTGVmdDogMSxcclxuICAgICAgICBwYWRkaW5nUmlnaHQ6IDEsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRyYXdIb3Jpem9udGFsTGluZTogKCkgPT4gZmFsc2UsXHJcbiAgICB9XHJcbiAgKTtcclxufVxyXG4iXX0=