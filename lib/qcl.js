"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  cleanup: true,
  install: true,
  list: true,
  set: true,
  uninstall: true,
  convertTimes: true,
  isValidDuration: true,
  parseDuration: true
};
Object.defineProperty(exports, "convertTimes", {
  enumerable: true,
  get: function () {
    return _utils.convertTimes;
  }
});
Object.defineProperty(exports, "isValidDuration", {
  enumerable: true,
  get: function () {
    return _utils.isValidDuration;
  }
});
Object.defineProperty(exports, "parseDuration", {
  enumerable: true,
  get: function () {
    return _utils.parseDuration;
  }
});
exports.uninstall = exports.set = exports.list = exports.install = exports.cleanup = void 0;

var cleanup = _interopRequireWildcard(require("./commands/cleanup"));

exports.cleanup = cleanup;

var install = _interopRequireWildcard(require("./commands/install"));

exports.install = install;

var list = _interopRequireWildcard(require("./commands/list"));

exports.list = list;

var set = _interopRequireWildcard(require("./commands/set"));

exports.set = set;

var uninstall = _interopRequireWildcard(require("./commands/uninstall"));

exports.uninstall = uninstall;

var _interfaces = require("./universal/interfaces");

Object.keys(_interfaces).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _interfaces[key];
    }
  });
});

var _utils = require("./universal/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9xY2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjbGVhbnVwIGZyb20gJy4vY29tbWFuZHMvY2xlYW51cCc7XHJcbmltcG9ydCAqIGFzIGluc3RhbGwgZnJvbSAnLi9jb21tYW5kcy9pbnN0YWxsJztcclxuaW1wb3J0ICogYXMgbGlzdCBmcm9tICcuL2NvbW1hbmRzL2xpc3QnO1xyXG5pbXBvcnQgKiBhcyBzZXQgZnJvbSAnLi9jb21tYW5kcy9zZXQnO1xyXG5pbXBvcnQgKiBhcyB1bmluc3RhbGwgZnJvbSAnLi9jb21tYW5kcy91bmluc3RhbGwnO1xyXG5leHBvcnQgKiBmcm9tICcuL3VuaXZlcnNhbC9pbnRlcmZhY2VzJztcclxuZXhwb3J0IHtcclxuICBjb252ZXJ0VGltZXMsXHJcbiAgaXNWYWxpZER1cmF0aW9uLFxyXG4gIHBhcnNlRHVyYXRpb24sXHJcbn0gZnJvbSAnLi91bml2ZXJzYWwvdXRpbHMnO1xyXG5cclxuLy8gVE9ETzogRml4IGltcG9ydC9leHBvcnQgaXNzdWUgd2hlcmUgeW91IG5lZWQgdG8gZG8gY2xlYW51cC5kZWZhdWx0KCkgaW5zdGVhZCBvZiBjbGVhbnVwKCkgYmVjYXVzZSBvdGhlcndpc2UgY2xlYW51cCdzIG90aGVyIGV4cG9ydHMgYXJlbid0IGV4cG9ydGVkLi4uXHJcbmV4cG9ydCB7IGNsZWFudXAsIGluc3RhbGwsIGxpc3QsIHVuaW5zdGFsbCwgc2V0IH07XHJcbiJdfQ==