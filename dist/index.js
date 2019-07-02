"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = routeName;

var _urlPattern = _interopRequireDefault(require("url-pattern"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function routeName(routes, name) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var prefix = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
  var newName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";

  //for every route in this object
  for (var _i = 0, _Object$entries = Object.entries(routes); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
        prop = _Object$entries$_i[0],
        route = _Object$entries$_i[1];

    //continue building the name of this route
    var _newName = newName; //if this route has more nested routes

    if (route.routes) {
      //if this route has a name attribute then concatenate it to the upper level name
      if (route.name) {
        _newName = (newName === "" ? "" : newName + ".") + route.name;
      } //continue recursively searching for the matching route name in the nested routes


      var url = routeName(route.routes, name, args, prefix + "/" + route.prefix, _newName); //if it did find the matching name return the url else continue

      if (url) return url; //if this object has no nested routes we need to return the url with the provided arguments
    } else {
      //if our route has a name attribute then use it otherwise use the property name
      var namePostfix = void 0,
          pathPostfix = void 0;

      if (route.name) {
        namePostfix = route.name;
        pathPostfix = route.endpoint;
      } else {
        namePostfix = prop;
        pathPostfix = route;
      }

      _newName = (newName === "" ? "" : newName + ".") + namePostfix; //if the newName we constructed matches the name provided by the user

      if (_newName === name) {
        return new _urlPattern["default"](prefix + "/" + pathPostfix).stringify(args);
      }
    }
  }
}